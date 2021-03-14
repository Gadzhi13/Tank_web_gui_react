import React, { useState, useEffect } from 'react'
import { Button, ListGroup, Row, Accordion, Card, FormGroup, FormControl, Popover, Overlay } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { BsFillPlayFill, BsFillPauseFill, BsFillSkipBackwardFill, BsFillSkipForwardFill, BsTablet } from 'react-icons/bs'


import { spotifyRequestHandler } from '../../../util/spotify/spotifyController'
import reduxState from '../../../types/reduxState'

const SpotifyPlayer = () => {

    const [devices, setDevices] = useState<Array<any>>()
    const [playlists, setPlaylists] = useState<Array<any>>()
    const [track, setTrack] = useState<string>()
    const [artist, setArtist] = useState<string>()
    const [currentProgress, setCurrentProgress] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)
    const [rangeTimeoutId, setRangeTimeoutId] = useState<NodeJS.Timeout>()
    const spotifyAccessToken: string = useSelector((state: reduxState) => state.spotifyAccessToken)
    const [deviceListShown, setDeviceListShown] = useState<boolean>(false)

    const showDevices = (): void => {
        setDeviceListShown(!deviceListShown)
        getDevices()
    }

    const getPlaylists = (): void => {
        if (playlists || !spotifyAccessToken) return
        spotifyRequestHandler(spotifyAccessToken, '/playlists', 'GET')
            .then((res) => {
                try {
                    setPlaylists(res.items)
                } catch (err) {
                    console.log(err)
                }
            })
    }

    const getDevices = (): void => {
        if (!spotifyAccessToken) return
        spotifyRequestHandler(spotifyAccessToken, '/player/devices', 'GET')
            .then((res) => {
                try {
                    setDevices(res.devices)
                } catch (err) {
                    console.log(err)
                }
            })
    }
    
    const getCurrentTrack = (): void => {
        if (!spotifyAccessToken) return
        spotifyRequestHandler(spotifyAccessToken, '/player/currently-playing', 'GET')
            .then((res): void => {
                try {
                    setArtist(res.item.artists[0].name)
                    setTrack(res.item.name)
                    setDuration(res.item.duration_ms)
                    setCurrentProgress(res.progress_ms / res.item.duration_ms * 100)
                } catch (err) {
                    console.log(err)
                }
            })
    }

    const changeCurrentProgress = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let targetProgress = 0
        if (Math.floor(((e.target.value as unknown) as number)) !== Math.floor(currentProgress)) {
            targetProgress = Math.floor(duration / 100 * ((e.target.value as unknown) as number))
        }
        if (targetProgress === 0) return
        setCurrentProgress(((e.target.value as unknown) as number))
        if (rangeTimeoutId) {
            clearTimeout(rangeTimeoutId)
        }
        setRangeTimeoutId(setTimeout((): void => sendChangeCurrentProgress(targetProgress), 100))
    }

    const play = (): void => {
        spotifyRequestHandler(spotifyAccessToken, '/player/play', 'PUT')
    }

    const pause = (): void => {
        spotifyRequestHandler(spotifyAccessToken, '/player/pause', 'PUT')
    }

    const next = (): void => {
        spotifyRequestHandler(spotifyAccessToken, '/player/next', 'POST')
    }

    const previous = (): void => {
        spotifyRequestHandler(spotifyAccessToken, '/player/previous', 'POST')
    }

    const changeDevice = (e: string): void => {
        spotifyRequestHandler(spotifyAccessToken, '/player', 'PUT', '{"device_ids": ["' + e + '"]}')
    }

    const sendChangeCurrentProgress = (targetProgress: number): void => {
        console.log(targetProgress)
        spotifyRequestHandler(spotifyAccessToken, '/player/seek?position_ms=' + targetProgress, 'PUT')
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            getCurrentTrack()
        }, 300)
        return () => clearInterval(intervalId)
    }, [getCurrentTrack])

    return (
        <div>
            <Row className="justify-content-sm-center">
                <Button variant="link" onClick={showDevices} id="devicesButton"><BsTablet/></Button>
                <Overlay
                    show={deviceListShown}
                    target={document.getElementById("devicesButton")}
                    placement="bottom"
                >
                    <Popover id="popover-basic">
                        <Popover.Title as="h3">Connected Devices</Popover.Title>
                        <Popover.Content>
                            <ListGroup>
                                {devices ? devices.map(el => <ListGroup.Item as='button' key={el.id} onClick={() => changeDevice(el.id)}>{el.name}</ListGroup.Item>) : null}
                            </ListGroup>
                        </Popover.Content>
                    </Popover>
                </Overlay>
            </Row>
            {track ? 'Current Track' : null}
            <ListGroup>
                {track ? <ListGroup.Item key={track}>{artist + ' - ' + track}</ListGroup.Item> : null}
            </ListGroup>
            <FormGroup>
                <FormControl type='range' value={currentProgress} onChange={changeCurrentProgress} />
            </FormGroup>
            <Row className="justify-content-sm-center">
                <Button onClick={previous}><BsFillSkipBackwardFill /></Button>
                <Button onClick={play}><BsFillPlayFill /></Button>
                <Button onClick={pause}><BsFillPauseFill /></Button>
                <Button onClick={next}><BsFillSkipForwardFill /></Button>
            </Row>
            <br />
            <Accordion onClick={getPlaylists}>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} eventKey="0" >
                            Show Playlist
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <ListGroup>
                                    {playlists ? playlists.map(el => <ListGroup.Item key={el.name}>{el.name}</ListGroup.Item>) : null}
                                </ListGroup>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card.Header>
                </Card>
            </Accordion>
        </div>
    )
}

export default SpotifyPlayer
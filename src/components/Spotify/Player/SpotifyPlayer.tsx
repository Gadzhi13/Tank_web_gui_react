import React, { useState, useEffect } from 'react'
import { Button, ListGroup, Row, Accordion, Card, FormGroup, FormControl, Popover, Overlay } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { BsFillPlayFill, BsFillPauseFill, BsFillSkipBackwardFill, BsFillSkipForwardFill, BsTablet } from 'react-icons/bs'

import WebPlayer from './WebPlayer/WebPlayer'
import { spotifyRequestHandler } from '../../../util/spotify/spotifyController'
import ReduxState from '../../../types/ReduxState'

const SpotifyPlayer = () => {

    const [devices, setDevices] = useState<Array<any>>() //TODO ADD TYPE
    const [playlists, setPlaylists] = useState<Array<any>>() //TODO ADD TYPE
    const [playlistInfos, setPlaylistInfos] = useState<Array<Array<any>>>() //TODO ADD TYPE
    const [track, setTrack] = useState<string>()
    const [artist, setArtist] = useState<string>()
    const [currentProgress, setCurrentProgress] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)
    const [rangeTimeoutId, setRangeTimeoutId] = useState<NodeJS.Timeout>()
    const spotifyAccessToken: string = useSelector((state: ReduxState) => state.spotifyAccessToken)
    const [deviceListShown, setDeviceListShown] = useState<boolean>(false)

    const showDevices = (): void => {
        setDeviceListShown(!deviceListShown)
        getDevices()
    }

    const getPlaylists = (): void => {
        if (playlists || !spotifyAccessToken) return
        spotifyRequestHandler(spotifyAccessToken, '/me/playlists', 'GET')
            .then((res) => {
                try {
                    setPlaylists(res.items)
                    console.log(res.items)
                } catch (err) {
                    console.log(err)
                }
            })
    }

    const getPlaylist = (id: string): void => {
        if (!spotifyAccessToken) return
        console.log(id)
        spotifyRequestHandler(spotifyAccessToken, '/playlists/' + id, 'GET')
            .then((res) => {
                try {
                    if (playlistInfos) {
                        const buffer = playlistInfos
                        buffer.push(res.tracks)
                        setPlaylistInfos(buffer)
                    }
                    console.log(playlistInfos)
                } catch (err) {
                    console.log(err)
                }
            })
    }

    const getDevices = (): void => {
        if (!spotifyAccessToken) return
        spotifyRequestHandler(spotifyAccessToken, '/me/player/devices', 'GET')
            .then((res) => {
                try {
                    setDevices(res.devices)
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
        spotifyRequestHandler(spotifyAccessToken, '/me/player/play', 'PUT')
    }

    const pause = (): void => {
        spotifyRequestHandler(spotifyAccessToken, '/me/player/pause', 'PUT')
    }

    const next = (): void => {
        spotifyRequestHandler(spotifyAccessToken, '/me/player/next', 'POST')
    }

    const previous = (): void => {
        spotifyRequestHandler(spotifyAccessToken, '/me/player/previous', 'POST')
    }

    const changeDevice = (id: string): void => {
        spotifyRequestHandler(spotifyAccessToken, '/me/player', 'PUT', '{"device_ids": ["' + id + '"]}')
    }

    const sendChangeCurrentProgress = (targetProgress: number): void => {
        console.log(targetProgress)
        spotifyRequestHandler(spotifyAccessToken, '/me/player/seek?position_ms=' + targetProgress, 'PUT')
    }

    useEffect(() => {
        const getCurrentTrack = (): void => {
            if (!spotifyAccessToken) return
            spotifyRequestHandler(spotifyAccessToken, '/me/player/currently-playing', 'GET')
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

        const intervalId = setInterval(() => {
            getCurrentTrack()
        }, 300)
        return () => clearInterval(intervalId)
    }, [spotifyAccessToken])

    return (
        <div>
            <WebPlayer accessToken={spotifyAccessToken}></WebPlayer>
            <Row className='justify-content-sm-center'>
                <Button variant='link' onClick={showDevices} id='devicesButton'><BsTablet /></Button>
                <Overlay
                    show={deviceListShown}
                    target={document.getElementById('devicesButton')}
                    placement='bottom'
                >
                    <Popover id='popover-basic'>
                        <Popover.Title as='h3'>Connected Devices</Popover.Title>
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
            <Row className='justify-content-sm-center'>
                <Button variant='link' onClick={previous}><BsFillSkipBackwardFill /></Button>
                <Button variant='link' onClick={play}><BsFillPlayFill /></Button>
                <Button variant='link' onClick={pause}><BsFillPauseFill /></Button>
                <Button variant='link' onClick={next}><BsFillSkipForwardFill /></Button>
            </Row>
            <br />
            <Accordion onClick={getPlaylists}>
                <Accordion.Toggle variant='dark' as={Button} eventKey='0' >
                    Show Playlist
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='0'>
                    <Card.Body>
                        <ListGroup>
                            {playlists ? playlists.map(el => {
                                return (
                                    <ListGroup.Item key={el.name}>
                                        <Accordion onClick={() => getPlaylist(el.id)}>
                                            <Accordion.Toggle variant='link' as={Button} eventKey='1' >
                                                {el.name}
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey='1'>
                                                <Card.Body>
                                                    <ListGroup>

                                                    </ListGroup>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Accordion>
                                    </ListGroup.Item>
                                )
                            }) : null}
                        </ListGroup>
                    </Card.Body>
                </Accordion.Collapse>
            </Accordion>
        </div>
    )
}

export default SpotifyPlayer
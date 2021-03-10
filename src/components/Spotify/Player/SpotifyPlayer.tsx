import React, { useState, useEffect } from 'react'
import { Button, ListGroup, Row, Accordion, Card, FormGroup, FormControl } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { BsFillPlayFill, BsFillPauseFill, BsFillSkipBackwardFill, BsFillSkipForwardFill } from "react-icons/bs"

import { spotifyRequestHandler } from '../../../util/spotify/spotifyController'
import reduxState from '../../../types/reduxState'

const SpotifyPlayer = () => {

    const [devices, setDevices] = useState<Array<any>>()
    const [playlists, setPlaylists] = useState<Array<any>>()
    const [track, setTrack] = useState<string>()
    const [artist, setArtist] = useState<string>()
    const [currentProgress, setCurrentProgress] = useState<number>(0)
    const [targetProgress, setTargetProgress] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)
    const spotifyAccessToken: string = useSelector((state: reduxState) => state.spotifyAccessToken)

    const getDevices = () => {
        spotifyRequestHandler(spotifyAccessToken, '/player/devices', 'GET')
            .then((res) => {
                try {
                    setDevices(res.devices)
                } catch (err) {
                    console.log(err)
                }
            })
    }

    const getPlaylists = () => {
        if (playlists) return
        spotifyRequestHandler(spotifyAccessToken, '/playlists', 'GET')
            .then((res) => {
                try {
                    setPlaylists(res.items)
                } catch (err) {
                    console.log(err)
                }
            })
    }

    const getCurrentTrack = () => {
        spotifyRequestHandler(spotifyAccessToken, '/player/currently-playing', 'GET')
            .then((res) => {
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

    const changeCurrentProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (Math.floor(((e.target.value as unknown) as number)) !== Math.floor(currentProgress)) {
            setTargetProgress(Math.floor(duration / 100 * ((e.target.value as unknown) as number)))
        }
    }

    const sendChangeCurrentProgress = (targetProgress: number) => {
        spotifyRequestHandler(spotifyAccessToken, '/player/seek?position_ms=' + targetProgress, 'PUT')
    }

    const play = () => {
        spotifyRequestHandler(spotifyAccessToken, '/player/play', 'PUT')
    }

    const pause = () => {
        spotifyRequestHandler(spotifyAccessToken, '/player/pause', 'PUT')
    }

    const next = () => {
        spotifyRequestHandler(spotifyAccessToken, '/player/next', 'POST')
    }

    const previous = () => {
        spotifyRequestHandler(spotifyAccessToken, '/player/previous', 'POST')
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
                getDevices()
                getCurrentTrack()
            }, 1000)
        return () => clearTimeout(intervalId)
        
    }, [])

    useEffect(() => {
        if (targetProgress == 0) return
        const timeoutId = setTimeout(() => sendChangeCurrentProgress(targetProgress), 500)
        return () => clearTimeout(timeoutId)
    }, [targetProgress])

    return (
        <div>
            <Accordion onClick={getDevices}>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} eventKey="0" >
                            Show Devices
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <ListGroup>
                                    {devices ? 'List of devices' : null}
                                    {devices ? devices.map(el => <ListGroup.Item key={el.id}>{el.name}</ListGroup.Item>) : null}
                                </ListGroup>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card.Header>
                </Card>
            </Accordion>
            {track ? 'Current Track' : null}
            <ListGroup>
                {track ? <ListGroup.Item key={track}>{artist + ' - ' + track}</ListGroup.Item> : null}
            </ListGroup>
            <FormGroup>
                <FormControl type='range' value={currentProgress} onChange={changeCurrentProgress} />
            </FormGroup>
            <Row className="justify-content-sm-center">
                <Button onClick={previous}><BsFillSkipBackwardFill/></Button>
                <Button onClick={play}><BsFillPlayFill/></Button>
                <Button onClick={pause}><BsFillPauseFill/></Button>
                <Button onClick={next}><BsFillSkipForwardFill/></Button>
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
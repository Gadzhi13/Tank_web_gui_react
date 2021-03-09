import React, { useState, useEffect } from 'react'
import { Button, ListGroup, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { spotifyRequestHandler } from '../../../util/spotify/spotifyController'
import reduxState from '../../../types/reduxState'

const SpotifyPlayer = () => {

    const [devices, setDevices] = useState<Array<any>>()
    const [track, setTrack] = useState<string>()
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

    const getCurrentTrack = () => {
        spotifyRequestHandler(spotifyAccessToken, '/player/currently-playing', 'GET')
            .then((res) => {
                try {
                    setTrack(res.item.name)
                } catch (err) {
                    console.log(err)
                }
            })
    }

    const play = () => {
        spotifyRequestHandler(spotifyAccessToken, '/player/play', 'PUT')
    }

    const pause = () => {
        spotifyRequestHandler(spotifyAccessToken, '/player/pause', 'PUT')
    }

    useEffect(() => {
        getDevices()
        getCurrentTrack()
    }, [])

    return(
        <div>
            <Row className="justify-content-sm-center">
                <Button onClick={getDevices}>Refresh Devices</Button>
                <Button onClick={getCurrentTrack}>Refresh Current Track</Button>
            </Row>
            <Row className="justify-content-sm-center">
                <Button onClick={play}>Play</Button>
                <Button onClick={pause}>Pause</Button>
            </Row>
            <ListGroup>
                {devices ? 'List of devices' : null}
                {devices ? devices.map(el => <ListGroup.Item key={el.id}>{el.name}</ListGroup.Item>) : null}
            </ListGroup>
            <ListGroup>
                {track ? 'Current Track' : null}
                {track ? <ListGroup.Item key={track}>{track}</ListGroup.Item> : null}
            </ListGroup>
        </div>
    )
}

export default SpotifyPlayer
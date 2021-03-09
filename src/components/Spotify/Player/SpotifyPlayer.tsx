import React, { useState, useEffect } from 'react'

import { spotifyGetDevices } from '../../../util/spotify/spotifyController'
import spotifyPlayerProps from '../../../types/spotifyPlayerProps'
import { Button, ListGroup } from 'react-bootstrap';

const SpotifyPlayer = (props: spotifyPlayerProps) => {

    const [devices, setDevices] = useState<Array<any>>()

    const getDevices = () => {
        spotifyGetDevices(props.accessToken)
            .then((res) => {
                console.log(res)
                try {
                    setDevices(res)
                } catch (err) {
                    console.log(err)
                }
            })
    }

    useEffect(() => {
        console.log('devices')
        console.log(devices)
    }, [devices])

    return(
        <div>
            <Button onClick={getDevices}>Get Devices</Button>
            <ListGroup>
                {devices ? devices.map(el => <ListGroup.Item key={el.id}>{el.name}</ListGroup.Item>) : null}
            </ListGroup>
        </div>
    )
}

export default SpotifyPlayer
import React, { useState } from 'react'
import { Button, Popover, ListGroup, Overlay } from 'react-bootstrap'
import { BsTablet } from 'react-icons/bs'

import { DeviceSeldctorProps } from '../../../../types/Spotify'
import { spotifyRequestHandler } from '../../../../util/spotify/spotifyController'

const DeviceSelector = (props: DeviceSeldctorProps) => {
    const [deviceListShown, setDeviceListShown] = useState<boolean>(false)
    const [devices, setDevices] = useState<Array<any>>() //TODO ADD TYPE

    const showDevices = (): void => {
        setDeviceListShown(!deviceListShown)
        getDevices()
    }

    const getDevices = (): void => {
        if (!props.accessToken) return
        spotifyRequestHandler(props.accessToken, '/me/player/devices', 'GET')
            .then((res) => {
                try {
                    setDevices(res.devices)
                } catch (err) {
                    console.log(err)
                }
            })
    }

    const changeDevice = (id: string): void => {
        spotifyRequestHandler(props.accessToken, '/me/player', 'PUT', '{"device_ids": ["' + id + '"]}')
    }

    return (
        <div>
            <Button variant='link' onClick={showDevices} id='devicesButton'><BsTablet /></Button>
            <Overlay
                show={deviceListShown}
                rootClose={true}
                target={document.getElementById('devicesButton')}
                onHide={showDevices}
                placement={props.placement ? props.placement : 'bottom'}
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
        </div>
    )
}

export default DeviceSelector
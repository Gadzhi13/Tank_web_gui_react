import React, { useState } from 'react'
import { Form, FormControl, FormLabel,  Button, FormGroup } from 'react-bootstrap'

import { useSpotifyConnect } from '../../util/spotify/spotifyController'

//TODO: add alphanumeric check on cleint ID

const Spotify = () => {

    const [clientId, setClientId] = useState('')
    const [clientPwd, setClientPwd] = useState('')

    const useHandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        let clientIdBuffer = event.currentTarget.formControlId.value
        let clientPwdBuffer = event.currentTarget.formControlPassword.value
        setClientId(clientIdBuffer)
        setClientPwd(clientPwdBuffer)
        useSpotifyConnect(clientId, clientPwd)
    }

    return (
        <div>
            <Form onSubmit={useHandleSubmit}>
                <FormGroup controlId="formControlId">
                    <FormLabel>Control Id:</FormLabel>
                    <FormControl size="lg" type="text" placeholder="Enter client ID"></FormControl>
                </FormGroup>
                <FormGroup controlId="formControlPassword">
                    <FormControl size="lg" type="password" placeholder="Enter client Password"></FormControl>
                </FormGroup>
                    <Button size="lg" variant="dark" type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default Spotify
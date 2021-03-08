import React, { useState } from 'react'
import { Form, FormControl, FormLabel,  Button, FormGroup } from 'react-bootstrap'

import { spotifyConnect } from '../../../util/spotify/spotifyController'
import SpotifyPlayer from '../Player/SpotifyPlayer'

//TODO: add alphanumeric check on cleint ID

const SpotifyMain = () => {

    const [clientId, setClientId] = useState<String>('')
    const [clientPwd, setClientPwd] = useState<String>('')
    const [accessToken, setAccessToken] = useState<String>('')

    const useHandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setClientId(event.currentTarget.formControlId.value)
        setClientPwd(event.currentTarget.formControlPassword.value)
        spotifyConnect(clientId, clientPwd).then((response) => {
            setAccessToken(response)
        })
        console.log(accessToken)
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
                    <Button size="lg" variant="dark" type="submit">Connect</Button>
            </Form>
            {accessToken !== '' ? <SpotifyPlayer accessToken={accessToken}></SpotifyPlayer> : null}
        </div>
    )
}

export default SpotifyMain
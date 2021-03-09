import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

import SpotifyPlayer from '../Player/SpotifyPlayer'

//TODO: add alphanumeric check on cleint ID

const SpotifyMain = () => {

    const [accessToken, setAccessToken] = useState<String>('')

    const spotifyUrl: string = 'https://accounts.spotify.com/authorize?'
    const clientId: string = 'client_id=3ad740515ff74609bb38bc94cebf18b6&'
    const redirectUrl: string = 'redirect_uri=http://localhost:3000/multimedia&'
    const responseType: string = 'response_type=token&'
    const scope: string = 'scope=user-read-playback-state&'
    const showDialog: string = 'show_dialog=false'

    const endUrl: string = spotifyUrl + clientId + redirectUrl + responseType + scope + showDialog

    useEffect(() => {
        const regExp = /([^&;=]+)=?([^&;]*)/g
        //  reg exp backup -  /([^&=]*)=?([^&]*)/g
        let a = regExp.exec(window.location.hash.substring(1))
        if (a) {
            setAccessToken(decodeURIComponent(a[2]))
        }
    }, [])

    return (
        <div>
            {accessToken !== '' ? <SpotifyPlayer accessToken={accessToken}></SpotifyPlayer> : <Button size="lg" variant="dark" href={endUrl}>Connect</Button>}
        </div>
    )
}

export default SpotifyMain
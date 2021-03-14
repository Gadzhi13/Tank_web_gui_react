import React, {  useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Store } from 'redux'
import { useStore, useSelector } from 'react-redux'

import SpotifyPlayer from '../Player/SpotifyPlayer'
import reduxState from '../../../types/reduxState'
import { setSpotifyAccessToken } from '../../../actions/setSpotifyAccessToken'

//TODO: add alphanumeric check on cleint ID

const SpotifyMain = () => {

    const store: Store = useStore()
    const spotifyAccessToken: string = useSelector((state: reduxState) => state.spotifyAccessToken)

    const spotifyUrl: string = 'https://accounts.spotify.com/authorize?'
    const clientId: string = 'client_id=3ad740515ff74609bb38bc94cebf18b6&'
    const redirectUrl: string = 'redirect_uri=http://localhost:3000/multimedia&'
    const responseType: string = 'response_type=token&'
    const scope: string = 'scope=user-read-playback-state user-modify-playback-state streaming user-read-email user-read-private&'
    const showDialog: string = 'show_dialog=true'

    const endUrl: string = spotifyUrl + clientId + redirectUrl + responseType + scope + showDialog

    useEffect(() => {
        const regExp = /([^&;=]+)=?([^&;]*)/g
        //  reg exp backup -  /([^&=]*)=?([^&]*)/g
        let a = regExp.exec(window.location.hash.substring(1))
        if (a) {
            store.dispatch(setSpotifyAccessToken(decodeURIComponent(a[2])))
        }
    }, [spotifyAccessToken, store])

    return (
        <div>
            {spotifyAccessToken ? <SpotifyPlayer/> : <Button size="lg" variant="dark" href={endUrl}>Connect</Button>}
        </div>
    )
}

export default SpotifyMain
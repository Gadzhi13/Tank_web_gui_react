import React, { useEffect } from 'react'
import { useSelector, useStore } from 'react-redux'
import { Store } from 'redux'

import { SpotifyPlayerCallback, WebPlayerProps, WebPlaybackError, WebPlaybackReady } from '../../../../types/Spotify'
import ReduxState from '../../../../types/ReduxState'
import { setWebPlayerId } from '../../../../actions/setWebPlayerId';

const WebPlayer = (props: WebPlayerProps) => {
    const webPlayerId: string = useSelector((state: ReduxState): string => state.webPlayerId)
    const store: Store = useStore()

    // @ts-ignore
    let player: WebPlaybackPlayer

    const initializePlayer = () => {
        // @ts-ignore
        player = new window.Spotify.Player({
            name: 'TankWebPlayer',
            getOAuthToken: (cb: SpotifyPlayerCallback) => { cb(props.accessToken) }
        })
        // Error handling
        player.addListener('initialization_error', ({ message }: WebPlaybackError) => { console.error(message) })
        player.addListener('authentication_error', ({ message }: WebPlaybackError) => { console.error(message) })
        player.addListener('account_error', ({ message }: WebPlaybackError) => { console.error(message) })
        player.addListener('playback_error', ({ message }: WebPlaybackError) => { console.error(message) })

        // Playback status updates
        //player.addListener('player_state_changed', state => { console.log(state) })

        // Ready
        player.addListener('ready', ({ device_id }: WebPlaybackReady) => {
            console.log('Ready with Device ID', device_id)
            store.dispatch(setWebPlayerId(device_id))
        })

        // Not Ready
        player.addListener('not_ready', ({ device_id }: WebPlaybackReady) => {
            console.log('Device ID has gone offline', device_id)
        })

        player.connect()
    }

    useEffect(() => {
        const scriptTag = document.getElementById('spotify-player')
        if (!scriptTag) {
            const script = document.createElement('script')

            script.id = 'spotify-player'
            script.type = 'text/javascript'
            script.async = false
            script.defer = true
            script.src = 'https://sdk.scdn.co/spotify-player.js'
            if (script.onload) { return }
            if (script.onerror) { return }
            document.head.appendChild(script)
        }

        if (!webPlayerId) {
            // @ts-ignore
            if (!window.onSpotifyWebPlaybackSDKReady) {
                // @ts-ignore
                window.onSpotifyWebPlaybackSDKReady = initializePlayer
            } else {
                initializePlayer()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div></div>
    )
}

export default WebPlayer
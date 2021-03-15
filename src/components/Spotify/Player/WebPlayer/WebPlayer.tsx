import React, { useEffect } from 'react'
import { SpotifyPlayerCallback, WebPlayerProps, WebPlaybackError, WebPlaybackReady } from '../../../../types/Spotify'

const WebPlayer = (props: WebPlayerProps) => {
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
        })

        // Not Ready
        player.addListener('not_ready', ({ device_id }: WebPlaybackReady) => {
            console.log('Device ID has gone offline', device_id)
        })

        player.connect()
    };

    const disconnectPlayer = () => {
        player.disconnect()
    }

    useEffect(() => {
        const loadSpotifyPlayer = () => {
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
        }

        // @ts-ignore
        if (!window.onSpotifyWebPlaybackSDKReady) {
            // @ts-ignore
            window.onSpotifyWebPlaybackSDKReady = initializePlayer
        } else {
            initializePlayer()
        }
        loadSpotifyPlayer()
        return () => {
            disconnectPlayer()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div></div>
    )
}

export default WebPlayer
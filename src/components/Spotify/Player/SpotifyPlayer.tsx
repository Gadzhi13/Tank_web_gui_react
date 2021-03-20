import React, { useState, useEffect } from 'react'
import { Row, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import WebPlayer from './WebPlayer/WebPlayer'
import { spotifyRequestHandler } from '../../../util/spotify/spotifyController'
import ReduxState from '../../../types/ReduxState'
import PlayerCommands from './PlayerCommands/PlayerCommands'
import CurrentTrack from './CurrentTrack/CurrentTrack'
import DeviceSelector from './DeviceSelector/DeviceSelector'
import Playlists from './Playlists/Playlists'
import Seekbar from './Seekbar/Seekbar'
import { CurrentlyPlaying, Track } from '../../../types/Spotify';

const SpotifyPlayer = () => {

    const [currentTrack, setCurrentTrack] = useState<Track>()
    const [currentlyPlaying, setCurrentlyPlaying] = useState<CurrentlyPlaying>()
    const spotifyAccessToken: string = useSelector((state: ReduxState) => state.spotifyAccessToken)

    useEffect(() => {
        const getCurrentlyPlaying = (): void => {
            if (!spotifyAccessToken) return
            spotifyRequestHandler(spotifyAccessToken, '/me/player', 'GET')
                .then((res: CurrentlyPlaying): void => {
                        try {
                            setCurrentlyPlaying(res)
                            const track = (res.item as Track)
                            setCurrentTrack(track)
                        } catch (err) {
                            console.log(err)
                        }
                })
        }

        const intervalId = setInterval(() => {
            getCurrentlyPlaying()
        }, 300)
        return () => clearInterval(intervalId)
    }, [spotifyAccessToken])

    return (
        <Container className='justify-content-sm-center'>
            <WebPlayer accessToken={spotifyAccessToken}></WebPlayer>
            <Row className='justify-content-sm-center'>
                <DeviceSelector accessToken={spotifyAccessToken}></DeviceSelector>
            </Row>
            <Row className='justify-content-sm-center'>
                <CurrentTrack track={currentTrack}></CurrentTrack>
            </Row>
            <Row className='justify-content-sm-center'>
                <Seekbar accessToken={spotifyAccessToken} currentlyPlaying={currentlyPlaying}></Seekbar>
            </Row>
            <Row className='justify-content-sm-center'>
                <PlayerCommands accessToken={spotifyAccessToken}></PlayerCommands>
            </Row>
            <Row className='justify-content-sm-center'>
                <Playlists accessToken={spotifyAccessToken}></Playlists>
            </Row>
        </Container>
    )
}

export default SpotifyPlayer
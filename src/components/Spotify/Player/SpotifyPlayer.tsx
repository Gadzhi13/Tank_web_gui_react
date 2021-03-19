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

    const [track, setTrack] = useState<string>('')
    const [currentTrack, setCurrentTrack] = useState<Track>()
    const [artist, setArtist] = useState<string>('')
    const [currentProgress, setCurrentProgress] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)
    const spotifyAccessToken: string = useSelector((state: ReduxState) => state.spotifyAccessToken)

    useEffect(() => {
        const getCurrentTrack = (): void => {
            if (!spotifyAccessToken) return
            spotifyRequestHandler(spotifyAccessToken, '/me/player', 'GET')
                .then((res: CurrentlyPlaying): void => {
                        try {
                            const track = (res.item as Track)
                            setCurrentTrack(track)
                            setArtist(track.artists[0].name)
                            setTrack(res.item.name)
                            setDuration(res.item.duration_ms)
                            setCurrentProgress(res.progress_ms / res.item.duration_ms * 100)
                        } catch (err) {
                            console.log(err)
                        }
                })
        }

        const intervalId = setInterval(() => {
            getCurrentTrack()
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
                <Seekbar accessToken={spotifyAccessToken} currentProgress={currentProgress} duration={duration} setCurrentProgress={setCurrentProgress}></Seekbar>
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
import React, { useState, useEffect } from 'react'
import { Row, FormGroup, FormControl } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import WebPlayer from './WebPlayer/WebPlayer'
import { spotifyRequestHandler } from '../../../util/spotify/spotifyController'
import ReduxState from '../../../types/ReduxState'
import PlayerCommands from './PlayerCommands/PlayerCommands'
import CurrentTrack from './CurrentTrack/CurrentTrack'
import DeviceSelector from './DeviceSelector/DeviceSelector'
import Playlists from './Playlists/Playlists'

const SpotifyPlayer = () => {

    const [track, setTrack] = useState<string>('')
    const [artist, setArtist] = useState<string>('')
    const [currentProgress, setCurrentProgress] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)
    const [rangeTimeoutId, setRangeTimeoutId] = useState<NodeJS.Timeout>()
    const spotifyAccessToken: string = useSelector((state: ReduxState) => state.spotifyAccessToken)

    const changeCurrentProgress = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let targetProgress = 0
        if (Math.floor(((e.target.value as unknown) as number)) !== Math.floor(currentProgress)) {
            targetProgress = Math.floor(duration / 100 * ((e.target.value as unknown) as number))
        }
        if (targetProgress === 0) return
        setCurrentProgress(((e.target.value as unknown) as number))
        if (rangeTimeoutId) {
            clearTimeout(rangeTimeoutId)
        }
        setRangeTimeoutId(setTimeout((): void => sendChangeCurrentProgress(targetProgress), 100))
    }

    const sendChangeCurrentProgress = (targetProgress: number): void => {
        console.log(targetProgress)
        spotifyRequestHandler(spotifyAccessToken, '/me/player/seek?position_ms=' + targetProgress, 'PUT')
    }

    useEffect(() => {
        const getCurrentTrack = (): void => {
            if (!spotifyAccessToken) return
            spotifyRequestHandler(spotifyAccessToken, '/me/player/currently-playing', 'GET')
                .then((res): void => {
                    try {
                        setArtist(res.item.artists[0].name)
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
        <div>
            <WebPlayer accessToken={spotifyAccessToken}></WebPlayer>
            <Row className='justify-content-sm-center'>
                <DeviceSelector accessToken={spotifyAccessToken}></DeviceSelector>
            </Row>
            <CurrentTrack accessToken={spotifyAccessToken} artist={artist} track={track}></CurrentTrack>
            <FormGroup>
                <FormControl type='range' value={currentProgress} onChange={changeCurrentProgress} />
            </FormGroup>
            <Row className='justify-content-sm-center'>
                <PlayerCommands accessToken={spotifyAccessToken}></PlayerCommands>
            </Row>
            <br />
            <Playlists accessToken={spotifyAccessToken}></Playlists>
        </div>
    )
}

export default SpotifyPlayer
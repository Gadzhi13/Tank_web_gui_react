import React, { useState, useEffect } from 'react'
import { FormControl } from 'react-bootstrap'

import { SeekbarProps } from '../../../../types/Spotify'
import { spotifyRequestHandler } from '../../../../util/spotify/spotifyController'
import './Seekbar.css'

const Seekbar = (props: SeekbarProps) => {
    const [rangeTimeoutId, setRangeTimeoutId] = useState<NodeJS.Timeout>()
    const [currentProgress, setCurrentProgress] = useState<number>(0)
    const [allowChange, setAllowChange] = useState<boolean>(true)

    useEffect(() => {
        if (props.currentlyPlaying?.progress_ms && props.currentlyPlaying?.item.duration_ms && allowChange) {
            setCurrentProgress(props.currentlyPlaying.progress_ms / props.currentlyPlaying.item.duration_ms * 100)
        }
    }, [props.currentlyPlaying, allowChange])

    const changeCurrentProgress = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let targetProgress = 0
        if (Math.floor(((e.target.value as unknown) as number)) !== Math.floor(currentProgress)) {
            targetProgress = Math.floor((props.currentlyPlaying?.item.duration_ms ? props.currentlyPlaying.item.duration_ms : 0) / 100 * ((e.target.value as unknown) as number))
        } else {
            return
        }
        setCurrentProgress(((e.target.value as unknown) as number))
        if (rangeTimeoutId) {
            clearTimeout(rangeTimeoutId)
        }
        setRangeTimeoutId(setTimeout((): void => sendChangeCurrentProgress(targetProgress), 100))
    }

    const sendChangeCurrentProgress = (targetProgress: number): void => {
        spotifyRequestHandler(props.accessToken, '/me/player/seek?position_ms=' + targetProgress, 'PUT')
    }

    const handleMouseDown = () => {
        setAllowChange(false)
    }

    const handleMouseUp = () => {
        setAllowChange(true)
    }

    return (
        <FormControl 
            className='seekbar' 
            type='range' 
            min='0' 
            max='100' 
            step='0.1' 
            value={currentProgress} 
            onChange={changeCurrentProgress} 
            onMouseDown={handleMouseDown} 
            onMouseUp={handleMouseUp}
            custom/>
    )
}

export default Seekbar
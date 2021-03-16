import React, { useState } from 'react'
import { FormControl } from 'react-bootstrap'

import { SeekbarProps } from '../../../../types/Spotify'
import { spotifyRequestHandler } from '../../../../util/spotify/spotifyController'

const Seekbar = (props: SeekbarProps) => {
    const [rangeTimeoutId, setRangeTimeoutId] = useState<NodeJS.Timeout>()

    const changeCurrentProgress = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let targetProgress = 0
        if (Math.floor(((e.target.value as unknown) as number)) !== Math.floor(props.currentProgress)) {
            targetProgress = Math.floor(props.duration / 100 * ((e.target.value as unknown) as number))
        }
        if (targetProgress === 0) return
        props.setCurrentProgress(((e.target.value as unknown) as number))
        if (rangeTimeoutId) {
            clearTimeout(rangeTimeoutId)
        }
        setRangeTimeoutId(setTimeout((): void => sendChangeCurrentProgress(targetProgress), 100))
    }

    const sendChangeCurrentProgress = (targetProgress: number): void => {
        spotifyRequestHandler(props.accessToken, '/me/player/seek?position_ms=' + targetProgress, 'PUT')
    }

    return (
        <FormControl type='range' value={props.currentProgress} onChange={changeCurrentProgress} />
    )
}

export default Seekbar
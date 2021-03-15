import React from 'react'

import { CurrentTrackProps } from '../../../../types/Spotify'
import { Alert } from 'react-bootstrap';

const CurrentTrack = (props: CurrentTrackProps) => {
    return (
        <Alert variant='info'>{props.artist + ' - ' + props.track}</Alert>
    )
}

export default CurrentTrack
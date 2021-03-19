import React from 'react'
import { Alert } from 'react-bootstrap'

import { CurrentTrackProps } from '../../../../types/Spotify'

const CurrentTrack = (props: CurrentTrackProps) => {
    return (
        <Alert variant='info'>{props.track ? props.track.artists[0].name + ' - ' + props.track.name : '-'}</Alert>
    )
}

export default CurrentTrack
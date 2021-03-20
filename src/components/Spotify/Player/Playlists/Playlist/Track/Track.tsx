import React from 'react'
import { Row, Button } from 'react-bootstrap'

import { TrackProps, instanceOfTrack } from '../../../../../../types/Spotify'
import { spotifyRequestHandler } from '../../../../../../util/spotify/spotifyController'

const Track = (props: TrackProps) => {
    const playTrack = (): void => {
        spotifyRequestHandler(props.accessToken, '/me/player/play', 'PUT', '{"context_uri": "' + props.playlistUri + '", "offset": {"position":' + props.trackNumber + '}}')
    }

    return (
        <Row className='justify-content-sm-center'>
            <Button variant='link' onClick={playTrack} block>{instanceOfTrack(props.track) ? props.track.artists[0].name : null} - {props.track.name}</Button>
        </Row>
    )
}

export default Track
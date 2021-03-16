import React from 'react'
import { Row, Button } from 'react-bootstrap'

import { TrackProps } from '../../../../../../types/Spotify'
import { spotifyRequestHandler } from '../../../../../../util/spotify/spotifyController';

const Track = (props: TrackProps) => {
    const playTrack = (): void => {
        spotifyRequestHandler(props.accessToken, '/me/player/play', 'PUT', '{"context_uri": "' + props.track.playlistUri + '", "offset": {"position":' + props.track.trackNumber + '}}')
    }

    return (
        <Row className='justify-content-sm-center'>
            <Button variant='link' onClick={playTrack} block>{props.track.artist} - {props.track.name}</Button>
        </Row>
    )
}

export default Track
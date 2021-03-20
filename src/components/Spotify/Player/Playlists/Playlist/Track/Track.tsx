import React from 'react'
import { Row, Button } from 'react-bootstrap'

import { TrackProps, Track as ITrack } from '../../../../../../types/Spotify'
import { spotifyRequestHandler } from '../../../../../../util/spotify/spotifyController'

const Track = (props: TrackProps) => {
    const playTrack = (): void => {
        spotifyRequestHandler(props.accessToken, '/me/player/play', 'PUT', '{"context_uri": "' + props.playlistUri + '", "offset": {"position":' + props.trackNumber + '}}')
    }


    if (props.track && props.track.type === 'track') { //check if spotify is oncec again sending empty track objects... Danke Spotify, sehr nett von euch :/
        return (
            <Row className='justify-content-sm-center'>
                <Button variant='link' onClick={playTrack} block>{(props.track as ITrack).artists[0].name} - {props.track.name}</Button>
            </Row>
        )
    } else {
        return (
            <Row className='justify-content-sm-center'>
                <Button variant='link' block>Only songs are supported</Button>
            </Row>
        )
    }

}

export default Track
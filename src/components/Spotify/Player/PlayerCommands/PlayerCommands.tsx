import React from 'react'
import { Row, Button } from 'react-bootstrap';
import { BsFillSkipBackwardFill, BsFillPlayFill, BsFillPauseFill, BsFillSkipForwardFill } from 'react-icons/bs'

import { spotifyRequestHandler } from '../../../../util/spotify/spotifyController'
import { PlayerCommandsProps } from '../../../../types/Spotify'

const PlayerCommands = (props: PlayerCommandsProps) => {
    const play = (): void => {
        spotifyRequestHandler(props.accessToken, '/me/player/play', 'PUT')
    }

    const pause = (): void => {
        spotifyRequestHandler(props.accessToken, '/me/player/pause', 'PUT')
    }

    const next = (): void => {
        spotifyRequestHandler(props.accessToken, '/me/player/next', 'POST')
    }

    const previous = (): void => {
        spotifyRequestHandler(props.accessToken, '/me/player/previous', 'POST')
    }
    return (
        <Row className='justify-content-sm-center'>
            <Button variant='link' onClick={previous}><BsFillSkipBackwardFill /></Button>
            <Button variant='link' onClick={play}><BsFillPlayFill /></Button>
            <Button variant='link' onClick={pause}><BsFillPauseFill /></Button>
            <Button variant='link' onClick={next}><BsFillSkipForwardFill /></Button>
        </Row>
    )
}

export default PlayerCommands
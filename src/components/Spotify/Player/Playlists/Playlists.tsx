import React, { useState } from 'react'
import { Accordion, ListGroup, Button } from 'react-bootstrap'

import { spotifyRequestHandler } from '../../../../util/spotify/spotifyController'
import { PlaylistsProps } from '../../../../types/Spotify'
import Playlist from './Playlist/Playlist';

const Playlists = (props: PlaylistsProps) => {
    const [playlists, setPlaylists] = useState<Array<any>>() //TODO ADD TYPE

    const getPlaylists = (): void => {
        if (playlists || !props.accessToken) return
        spotifyRequestHandler(props.accessToken, '/me/playlists', 'GET')
            .then((res) => {
                try {
                    setPlaylists(res.items)
                } catch (err) {
                    console.log(err)
                }
            })
    }

    return (
        <Accordion onClick={getPlaylists}>
            <Accordion.Toggle variant='dark' as={Button} eventKey='0' >
                Show Playlist
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
                <ListGroup>
                    {playlists ? playlists.map(el => {
                        return (
                            <ListGroup.Item key={el.name}>
                                <Playlist accessToken={props.accessToken} name={el.name} id={el.id}></Playlist>
                            </ListGroup.Item>
                        )
                    }) : null}
                </ListGroup>
            </Accordion.Collapse>
        </Accordion>
    )
}

export default Playlists
import React, { useState } from 'react'
import { Accordion, ListGroup, Button } from 'react-bootstrap'

import { spotifyRequestHandler } from '../../../../util/spotify/spotifyController'
import { PlaylistsProps, PagingObject, SimplifiedPlaylist } from '../../../../types/Spotify'
import Playlist from './Playlist/Playlist'

const Playlists = (props: PlaylistsProps) => {
    const [playlists, setPlaylists] = useState<SimplifiedPlaylist[]>()
    const playlistsDummy: string[] = ['', '', '', '', '']

    const getPlaylists = (): void => {
        if (playlists || !props.accessToken) return
        spotifyRequestHandler(props.accessToken, '/me/playlists', 'GET')
            .then((res: PagingObject<SimplifiedPlaylist>) => {
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
                                    <Playlist accessToken={props.accessToken} playlist={el}></Playlist>
                                </ListGroup.Item>
                            )
                        }) : playlistsDummy.map((el, index) => {
                            return (
                                <ListGroup.Item key={index}>
                                    Loading
                                </ListGroup.Item>
                            )
                        })
                    }
                </ListGroup>
            </Accordion.Collapse>
        </Accordion>
    )
}

export default Playlists
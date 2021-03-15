import React, { useState } from 'react'
import { Accordion, Card, ListGroup, Button } from 'react-bootstrap'

import { spotifyRequestHandler } from '../../../../util/spotify/spotifyController'
import { PlaylistsProps } from '../../../../types/Spotify'

const Playlists = (props: PlaylistsProps) => {
    const [playlists, setPlaylists] = useState<Array<any>>() //TODO ADD TYPE
    const [playlistInfos, setPlaylistInfos] = useState<Array<Array<any>>>() //TODO ADD TYPE

    const getPlaylists = (): void => {
        if (playlists || !props.accessToken) return
        spotifyRequestHandler(props.accessToken, '/me/playlists', 'GET')
            .then((res) => {
                try {
                    setPlaylists(res.items)
                    console.log(res.items)
                } catch (err) {
                    console.log(err)
                }
            })
    }

    const getPlaylist = (id: string): void => {
        if (!props.accessToken) return
        console.log(id)
        spotifyRequestHandler(props.accessToken, '/playlists/' + id, 'GET')
            .then((res) => {
                try {
                    if (playlistInfos) {
                        const buffer = playlistInfos
                        buffer.push(res.tracks)
                        setPlaylistInfos(buffer)
                    }
                    console.log(playlistInfos)
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
                <Card.Body>
                    <ListGroup>
                        {playlists ? playlists.map(el => {
                            return (
                                <ListGroup.Item key={el.name}>
                                    <Accordion onClick={() => getPlaylist(el.id)}>
                                        <Accordion.Toggle variant='link' as={Button} eventKey='1' >
                                            {el.name}
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey='1'>
                                            <Card.Body>
                                                <ListGroup>

                                                </ListGroup>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Accordion>
                                </ListGroup.Item>
                            )
                        }) : null}
                    </ListGroup>
                </Card.Body>
            </Accordion.Collapse>
        </Accordion>
    )
}

export default Playlists
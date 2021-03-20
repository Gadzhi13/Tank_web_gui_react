import React, { useState } from 'react'
import { Accordion, Button, ListGroup } from 'react-bootstrap'

import { PlaylistProps, Playlist as IPlaylist } from '../../../../../types/Spotify'
import { spotifyRequestHandler } from '../../../../../util/spotify/spotifyController'
import Track from './Track/Track'

const Playlist = (props: PlaylistProps) => {
    const [playlist, setPlaylist] = useState<IPlaylist>()

    const getPlaylist = (): void => {
        if (!props.accessToken || playlist) return
        spotifyRequestHandler(props.accessToken, '/playlists/' + props.playlist.id, 'GET')
            .then((res: IPlaylist) => {
                try {
                    console.log(res)
                    setPlaylist(res)
                } catch (err) {
                    console.log(err)
                }
            })
    }

    return (
        <Accordion onClick={getPlaylist}>
            <Accordion.Toggle variant='link' as={Button} eventKey='1'>
                {props.playlist.name}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='1'>
                <ListGroup>
                    {playlist ? playlist.tracks.items.map((el, index) => {
                            return (
                                <ListGroup.Item key={index}>
                                    <Track accessToken={props.accessToken} track={el.track} playlistUri={playlist.uri} trackNumber={index}></Track>
                                </ListGroup.Item>
                            )
                        }) :
                            <ListGroup.Item>Loading</ListGroup.Item>
                    }
                </ListGroup>
            </Accordion.Collapse>
        </Accordion>
    )
}

export default Playlist
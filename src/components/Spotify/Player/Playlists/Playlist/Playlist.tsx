import React, { useState } from 'react'
import { Accordion, ListGroup, useAccordionToggle, Card } from 'react-bootstrap'

import { PlaylistProps, Playlist as IPlaylist } from '../../../../../types/Spotify'
import { spotifyRequestHandler } from '../../../../../util/spotify/spotifyController'
import Track from './Track/Track'

import './Playlist.css'

const Playlist = (props: PlaylistProps) => {
    const [playlist, setPlaylist] = useState<IPlaylist>()
    const toggleAcc = useAccordionToggle(props.index.toString(), () => {})

    const getPlaylist = (): void => {
        if (!props.accessToken || playlist) return
        spotifyRequestHandler(props.accessToken, '/playlists/' + props.playlist.id, 'GET')
            .then((res: IPlaylist) => {
                try {
                    setPlaylist(res)
                } catch (err) {
                    console.log(err)
                }
            })
    }

    const togglePlaylist = () => {
        getPlaylist()
        toggleAcc()
    }

    return (
        <Card className='playlistTile'>
            <Card.Header onClick={togglePlaylist}>
                    {props.playlist.name}
            </Card.Header>
            <Accordion.Collapse eventKey={props.index.toString()}>
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
        </Card>
    )
}

export default Playlist
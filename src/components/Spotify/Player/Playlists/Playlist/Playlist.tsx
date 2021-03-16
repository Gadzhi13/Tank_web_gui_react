import React, { useState } from 'react'
import { Accordion, Button, ListGroup } from 'react-bootstrap'

import { PlaylistProps, IPlaylist, ITrack } from '../../../../../types/Spotify'
import { spotifyRequestHandler } from '../../../../../util/spotify/spotifyController'
import Track from './Track/Track'

const Playlist = (props: PlaylistProps) => {
    const [playlistInfo, setPlaylistInfo] = useState<IPlaylist>() //TODO ADD TYPE

    const getPlaylist = (): void => {
        if (!props.accessToken || playlistInfo) return
        spotifyRequestHandler(props.accessToken, '/playlists/' + props.id, 'GET')
            .then((res) => {
                try {
                    if (res.id) {
                        setPlaylistInfo(
                            {
                                name: res.name, id: res.id, tracks: res.tracks.items.map(
                                    //@ts-ignore
                                    (el, index): ITrack => {
                                        return {
                                            artist: el.track.artists[0].name, name: el.track.name, id: el.track.id, playlistUri: res.uri, trackNumber: index
                                        }
                                    }
                                )
                            })
                    }
                } catch (err) {
                    console.log(err)
                }
            })
    }

    return (
        <Accordion onClick={getPlaylist}>
            <Accordion.Toggle variant='link' as={Button} eventKey='1' >
                {props.name}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='1'>
                <ListGroup>
                    {playlistInfo ? playlistInfo.tracks.map(el => {
                        return (
                            <Track accessToken={props.accessToken} track={el} key={el.id}></Track>
                        )
                    }) : null}
                </ListGroup>
            </Accordion.Collapse>
        </Accordion>
    )
}

export default Playlist
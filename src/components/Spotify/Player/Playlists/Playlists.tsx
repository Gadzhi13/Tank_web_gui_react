import React, { useState } from 'react'
import { Accordion, Card, useAccordionToggle } from 'react-bootstrap'

import { spotifyRequestHandler } from '../../../../util/spotify/spotifyController'
import { PlaylistsProps, PagingObject, SimplifiedPlaylist } from '../../../../types/Spotify'
import Playlist from './Playlist/Playlist'

import './Playlists.css'

const Playlists = (props: PlaylistsProps) => {
    const [playlists, setPlaylists] = useState<SimplifiedPlaylist[]>()

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

    const togglePlaylists = () => {
        getPlaylists()
    }

    return (
        <Accordion>
            <Card>
                <Accordion.Toggle as={Card.Header} onClick={togglePlaylists} eventKey='200' className='playlistsToggle'>
                        Toggle Playlists
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='200'>
                    <Accordion>
                        {playlists ? playlists.map((el, index) => {
                            return (<Playlist accessToken={props.accessToken} playlist={el} index={index} key={index}></Playlist>)
                        }) : null}
                    </Accordion>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default Playlists
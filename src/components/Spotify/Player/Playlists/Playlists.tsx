import React, { useState } from 'react'
import { Accordion, Button, ListGroup } from 'react-bootstrap'

import { spotifyRequestHandler } from '../../../../util/spotify/spotifyController'
import { PlaylistsProps, PagingObject, SimplifiedPlaylist } from '../../../../types/Spotify'
import Playlist from './Playlist/Playlist'

const Playlists = (props: PlaylistsProps) => {
    const [playlists, setPlaylists] = useState<SimplifiedPlaylist[]>()
    const [showPlaylists, setShowPlaylists] = useState<boolean>(false)

    const getPlaylists = (): void => {
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
        setShowPlaylists(!showPlaylists)
        if (playlists || !props.accessToken) return
        getPlaylists()
    }

    return (
        <div>
            <Button variant='dark' onClick={togglePlaylists}>Toggle Playlists</Button>
            {showPlaylists &&
                <Accordion>
                    {playlists ? playlists.map((el, index) => {
                        return (<Playlist accessToken={props.accessToken} playlist={el} index={index}></Playlist>)
                    }) : null}
                </Accordion>
            }
        </div>
    )
}

export default Playlists
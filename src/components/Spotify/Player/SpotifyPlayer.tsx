import React, { useState, useEffect } from 'react'
import { spotifyGetDevices } from '../../../util/spotify/spotifyController';
import spotifyPlayerProps from '../../../types/spotifyPlayerProps';

const SpotifyPlayer = (props: spotifyPlayerProps) => {

    const [devices, setDevices] = useState<Array<String>>([])

    useEffect(() =>  {
        spotifyGetDevices(props.accessToken)
    })

    return(
        <div>SpotifyPlayer loaded</div>
    )
}

export default SpotifyPlayer
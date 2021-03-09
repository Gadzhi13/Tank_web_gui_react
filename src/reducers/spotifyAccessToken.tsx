import { Reducer } from 'redux'

const spotifyAccessToken: Reducer = (state: string = '', {type, payload}): string => {
    switch (type) {
        case 'SET_SPOTIFY_ACCESS_TOKEN':
            return payload
        default:
            return state
    }
}

export default spotifyAccessToken
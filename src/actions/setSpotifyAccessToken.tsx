import { setSpotifyAccessToken as IsetSpotifyAccessToken } from '../types/Spotify'

export const setSpotifyAccessToken = (accessToken: string): IsetSpotifyAccessToken => {
    return {
        type: 'SET_SPOTIFY_ACCESS_TOKEN',
        payload: accessToken
    }
}
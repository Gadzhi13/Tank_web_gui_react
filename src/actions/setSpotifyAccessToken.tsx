import setSpotifyAccessTokenType from '../types/setSpotifyAccessToken'

export const setSpotifyAccessToken = (accessToken: string): setSpotifyAccessTokenType => {
    return {
        type: 'SET_SPOTIFY_ACCESS_TOKEN',
        payload: accessToken
    }
}
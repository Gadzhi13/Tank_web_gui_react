export interface setSpotifyAccessToken {
    type: string
    payload: string
}

export type SpotifyPlayerCallback = (token: string) => void

export interface WebPlayerProps {
    accessToken: string
}

export type WebPlaybackErrors =
    | 'initialization_error'
    | 'authentication_error'
    | 'account_error'
    | 'playback_error'

export interface WebPlaybackError {
    message: WebPlaybackErrors
}

export interface WebPlaybackReady {
    device_id: string
}

export interface WebPlaybackPlayer {
    _options: {
        getOAuthToken: SpotifyPlayerCallback
        name: string
    }
    addListener: {
        (event: WebPlaybackErrors, callback: (d: WebPlaybackError) => void): boolean
    }
}
export type Placement = import('react-overlays/usePopper').Placement;

export interface setSpotifyAccessToken {
    type: string
    payload: string
}

export type SpotifyPlayerCallback = (token: string) => void

export interface WebPlayerProps {
    accessToken: string
}

export interface PlayerCommandsProps {
    accessToken: string
}

export interface PlaylistsProps {
    accessToken: string
}

export interface CurrentTrackProps {
    accessToken: string,
    artist: string,
    track: string
}

export interface DeviceSeldctorProps {
    accessToken: string,
    placement?: Placement
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
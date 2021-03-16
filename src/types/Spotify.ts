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

export interface TrackProps {
    accessToken: string,
    track: ITrack
}

export interface ITrack {
    artist: string,
    name: string,
    id: string,
    playlistUri: string,
    trackNumber: string
}

export interface PlaylistProps {
    accessToken: string,
    name: string,
    id: string
}

export interface IPlaylist {
    name: string,
    id: string,
    tracks: Array<ITrack>
}

export interface SeekbarProps {
    accessToken: string,
    currentProgress: number,
    duration: number,
    setCurrentProgress: (value: React.SetStateAction<number>) => void
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
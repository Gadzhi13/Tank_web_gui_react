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
    track: Track | undefined
}

export interface TrackProps {
    accessToken: string
    track: ITrack
}

export interface ITrack {
    artist: string
    name: string
    id: string
    playlistUri: string
    trackNumber: string
}

export interface PlaylistProps {
    accessToken: string
    name: string
    id: string
}

export interface IPlaylist {
    name: string
    id: string
    tracks: Array<ITrack>
}

export interface SeekbarProps {
    accessToken: string
    currentProgress: number
    duration: number
    setCurrentProgress: (value: React.SetStateAction<number>) => void
}

export interface DeviceSeldctorProps {
    accessToken: string
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

export interface dummy {
    [key: string]: any
}

export interface CurrentlyPlaying {
    actions: Disallows
    context: any
    currently_playing_type: string
    device: Device
    is_playing: boolean
    item: Track | Episode
    progress_ms: number
    repeat_state: string
    shuffle_state: string
    timestamp: number
}

export interface Disallows {
  resuming: boolean
  skipping_prev: boolean
}

export interface Device {
    id: string
    is_active: boolean
    is_private_session: boolean
    is_restricted: boolean
    name: string
    type: string
    volume_percent: number
}

export interface Devices {
    devices: Array<Device>
}

export interface Track {
    artists: Artist[]
    available_markets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: any
    external_urls: any
    href: string
    id: string
    is_local: boolean
    is_playable: boolean
    linked_from: any
    name: string
    popularity: number
    preview_url: string
    restrictions: any
    track_number: number
    type: string
    uri: string
}

export interface Episode {
    audio_preview_url: string
    description: string
    duration_ms: number
    explicit: boolean
    external_urls: any
    href: string
    id: string
    images: Image[]
    is_externally_hosted: boolean
    is_playable: boolean
    language: string
    languages: string[]
    name: string
    release_date: string
    release_date_precision: string
    resume_point: any
    show: any
    type: string
    uri: string
}

export interface Artist {
    external_urls: any
    followers: any
    genres: String[]
    href: string
    id: string
    images: Image[]
    name: string
    popularity: number
    type: string
    uri: string
}

export interface Image {
    height: number
    url: string
    width: number
}
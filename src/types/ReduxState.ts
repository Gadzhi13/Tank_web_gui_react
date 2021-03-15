export default interface ReduxState {
    isSignedIn: boolean,
    prevRouteId: number,
    animationDirection: string,
    safeToNavigate: boolean,
    spotifyAccessToken: string
}
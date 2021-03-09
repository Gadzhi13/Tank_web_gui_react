export default interface reduxState {
    isSignedIn: boolean,
    prevRouteId: number,
    animationDirection: string,
    safeToNavigate: boolean,
    spotifyAccessToken: string
}
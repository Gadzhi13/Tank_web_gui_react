import { combineReducers, Reducer } from 'redux'

import isSignedIn from './isSignedIn'
import prevRouteId from './prevRouteId'
import animationDirection from './animationDirection'
import safeToNavigate from './safeToNavigate'
import spotifyAccessToken from './spotifyAccessToken'

const root: Reducer = combineReducers({
    isSignedIn,
    prevRouteId,
    animationDirection,
    safeToNavigate,
    spotifyAccessToken
})

export default root
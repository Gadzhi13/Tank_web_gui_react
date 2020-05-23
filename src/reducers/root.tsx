import { combineReducers, Reducer } from 'redux'

import isSignedIn from './isSignedIn'
import prevRouteId from './prevRouteId'
import animationDirection from './animationDirection'
import safeToNavigate from './safeToNavigate'

const root: Reducer = combineReducers({
    isSignedIn,
    prevRouteId,
    animationDirection,
    safeToNavigate
})

export default root
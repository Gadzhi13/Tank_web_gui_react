import { combineReducers, Reducer } from 'redux'

import isSignedIn from './isSignedIn'
import prevRouteId from './prevRouteId'
import animationDirection from './animationDirection'
import safeToRender from './safeToRender'

const root: Reducer = combineReducers({
    isSignedIn,
    prevRouteId,
    animationDirection,
    safeToRender
})

export default root
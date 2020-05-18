import { combineReducers, Reducer } from 'redux'

import isSignedIn from './isSignedIn'
import prevRouteId from './prevRouteId'

const root: Reducer = combineReducers({
    isSignedIn,
    prevRouteId
})

export default root
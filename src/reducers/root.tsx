import { combineReducers, Reducer } from 'redux'

import isSignedIn from './isSignedIn'

const root: Reducer = combineReducers({
    isSignedIn
})

export default root
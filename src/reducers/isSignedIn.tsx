import { Action, Reducer } from 'redux'

const isSignedIn: Reducer = (state: boolean = false, action: Action): boolean => { //CHANGE TO FALSE
    switch (action.type) {
        case 'SIGN_IN':
            return true
        case 'SIGN_OUT':
            return false
        default:
            return state
    }
}

export default isSignedIn
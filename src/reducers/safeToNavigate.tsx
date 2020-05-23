import { Action, Reducer } from 'redux'

const safeToNavigate: Reducer = (state: boolean = false, action: Action): boolean => {
    switch (action.type) {
        case 'SET_SAFE_TO_NAVIGATE':
            return true
        case 'SET_NOT_SAFE_TO_NAVIGATE':
            return false
        default:
            return state
    }
}

export default safeToNavigate
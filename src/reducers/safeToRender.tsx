import { Action, Reducer } from 'redux'

const safeToRender: Reducer = (state: boolean = false, action: Action): boolean => {
    switch (action.type) {
        case 'SET_SAFE_TO_RENDER':
            return true
        case 'SET_NOT_SAFE_TO_RENDER':
            return false
        default:
            return state
    }
}

export default safeToRender
import { Action } from 'redux'

export const setSafeToNavigate = (): Action => {
    return {
        type: 'SET_SAFE_TO_NAVIGATE'
    }
}
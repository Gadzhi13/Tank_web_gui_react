import { Action } from 'redux'

export const setNotSafeToNavigate = (): Action => {
    return {
        type: 'SET_NOT_SAFE_TO_NAVIGATE'
    }
}
import { Action } from 'redux'

export const setNotSafeToRender = (): Action => {
    return {
        type: 'SET_NOT_SAFE_TO_RENDER'
    }
}
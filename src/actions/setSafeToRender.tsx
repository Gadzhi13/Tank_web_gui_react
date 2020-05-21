import { Action } from 'redux'

export const setSafeToRender = (): Action => {
    return {
        type: 'SET_SAFE_TO_RENDER'
    }
}
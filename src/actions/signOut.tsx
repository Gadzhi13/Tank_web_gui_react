import { Action } from 'redux'

export const signOut = (): Action => {
    return {
        type: 'SIGN_OUT'
    }
}
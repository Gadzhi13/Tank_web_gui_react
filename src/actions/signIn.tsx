import { Action } from 'redux'

export const signIn = (): Action => {
    return {
        type: 'SIGN_IN'
    }
}
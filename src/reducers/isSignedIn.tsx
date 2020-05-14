import { Action, Reducer } from "redux";

const isSignedIn: Reducer = (state: boolean = false, action: Action): boolean => {
    switch (action.type) {
        case 'SIGN_IN':
            return true
        case 'SIGN_OUT':
            return false
        default:
            return false
    }
}

export default isSignedIn
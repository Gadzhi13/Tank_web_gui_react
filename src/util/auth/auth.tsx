import { useSelector } from 'react-redux'
import { signIn } from '../../actions/signIn'
import { signOut } from '../../actions/signOut'
import State from '../../types/reduxState'
import { Dispatch } from 'redux'


export const useSignIn = (username: String, password: String, dispatch: Dispatch): boolean => {
    //ToDo impelent call to backend and cookie injection
    if (username === "admin" && password === "admin") {
        dispatch(signIn())
        return true
    }
    return false
}

export const useSignOut = (dispatch: Dispatch): void => {
    //ToDo impelent call to backed and cookie deletion
    dispatch(signOut())
}

export const useCheckSignedIn = (): boolean => {
    //ToDo change to call to Backend and check cookie expire time
    console.log("useCheckSignedIn fired in auth")
    let state = useSelector((state: State) => state.isSignedIn)
    return state
}

export const useCheckCookieAndUpdateState = (cookie: string): boolean => {
    //ToDo change to call to Backend and check cookie expire time
    console.log("useCheckCookieAndUpdateState fired in auth")
    let state = useSelector((state: State) => state.isSignedIn)
    return state
}

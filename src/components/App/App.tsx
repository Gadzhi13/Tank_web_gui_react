import React, { useState, useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { BrowserRouter } from 'react-router-dom'

import logo from '../../logo.svg'
import './App.css'
import NavBar from '../NavBar/NavBar'
import AuthenticatedApp from '../AuthenticatedApp/AuthenticatedApp'
import UnauthenticatedApp from '../UnauthenticatedApp/UnauthenticatedApp'
import ReduxState from '../../types/ReduxState'
import { signIn } from '../../actions/signIn'


const App = () => {
    const dispatch: Dispatch = useDispatch()
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
    const isSignedInRedux: boolean = useSelector((state: ReduxState) => state.isSignedIn)

    useEffect(() => {
        setIsSignedIn(isSignedInRedux)
    }, [isSignedInRedux, setIsSignedIn])

    useMemo(() => {
        console.log(document.cookie)
        if (document.cookie === "isSignedIn=true") {
            setIsSignedIn(true)
            dispatch(signIn())
        }
    }, [])

    return (
        <BrowserRouter>
            <div className="app">
                <header className="app-header">
                    {isSignedIn ? <NavBar /> : <img src={logo} className="app-logo" alt="logo" />}
                </header>
                <div className="app-container">
                    {isSignedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />}
                </div>
                <footer className="app-footer">
                    Gadget Corp. 2020
                </footer>
            </div>
        </BrowserRouter>
    )
}

export default App

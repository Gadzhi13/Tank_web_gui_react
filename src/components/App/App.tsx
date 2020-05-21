import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useLocation } from 'react-router-dom'

import logo from '../../logo.svg'
import './App.css'
import State from '../../types/reduxState'
import NavBar from '../NavBar/NavBar'
import AuthenticatedApp from '../AuthenticatedApp/AuthenticatedApp'
import UnauthenticatedApp from '../UnauthenticatedApp/UnauthenticatedApp'


const App = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const prevRouteId: number = useSelector((state: State): number => state.prevRouteId)
    const isSignedIn: boolean = useSelector((state: State) => state.isSignedIn)

    return (
        <div className="app">
            <header className="app-header">
                {isSignedIn ? <NavBar /> : <img src={logo} className="app-logo" alt="logo" />}
            </header>
            <div className="app-container">
                {isSignedIn ? <Redirect to="/welcome" /> : <Redirect to='/login' />}
                {isSignedIn ? <AuthenticatedApp location={location} dispatch={dispatch} prevRouteId={prevRouteId} /> : <UnauthenticatedApp />}
            </div>
            <footer className="app-footer">
                Gadget Corp. 2020
                </footer>
        </div>
    )
}

export default App

import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, BrowserRouter } from 'react-router-dom'

import logo from '../../logo.svg'
import './App.css'
import State from '../../types/reduxState'
import NavBar from '../NavBar/NavBar'
import AuthenticatedApp from '../AuthenticatedApp/AuthenticatedApp'
import UnauthenticatedApp from '../UnauthenticatedApp/UnauthenticatedApp'


const App = () => {
    const isSignedIn: boolean = useSelector((state: State) => state.isSignedIn)

    return (
        <BrowserRouter>
            <div className="app">
                <header className="app-header">
                    {isSignedIn ? <NavBar /> : <img src={logo} className="app-logo" alt="logo" />}
                </header>
                <div className="app-container">
                    {isSignedIn ? null : <Redirect to='/login' />}
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

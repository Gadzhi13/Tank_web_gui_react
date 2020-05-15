import React from 'react'
import { useSelector } from 'react-redux'
import logo from '../../logo.svg'
import './App.css'

import NavBar from '../NavBar/NavBar'
import AuthenticatedApp from '../AuthenticatedApp/AuthenticatedApp'
import State from '../../types/reduxState'
import UnauthenticatedApp from '../UnauthenticatedApp/UnauthenticatedApp'
import { BrowserRouter, Redirect } from 'react-router-dom'


const App = () => {
    const isSignedIn: boolean = useSelector((state: State) => state.isSignedIn)

    return (
        <div className="app">
            <BrowserRouter>
                <header className="app-header">
                    {isSignedIn ? <NavBar /> : <img src={logo} className="app-logo" alt="logo" />}
                </header>
                <div className="app-container">
                    {isSignedIn ? <Redirect to="/welcome" /> : <Redirect to='/login' />}
                    {isSignedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />}
                </div>
                <footer className="app-footer">
                    Gadget Corp. 2020
                </footer>
            </BrowserRouter>
        </div>
    )
}

export default App

import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import logo from '../../logo.svg'
import './App.css'

import Login from '../Login/Login'
import NavBar from '../NavBar/NavBar'
import Welcome from '../Welcome/Welcome'

interface AppProps {

}

interface AppState {
    isSignedIn: boolean
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
        this.state = {
            isSignedIn: false
        }
    }

    render() {
        return (
            <div className="app">
                <header className="app-header">
                    <Router>
                        <Route path="/login" exact render={() => {return <img src={logo} className="app-logo" alt="logo" />}} />
                    </Router>
                    <NavBar isSignedIn={this.state.isSignedIn} />
                </header>
                <div className="app-container">
                    <Router>
                        {!this.state.isSignedIn ? <Redirect from="/" to="/login" /> : null}
                        <Route path="/login" exact component={Login} />
                        <Route path="/welcome" exact component={Welcome} />
                    </Router>
                </div>
                <footer className="app-footer">
                    Gadget Corp. 2020
                </footer>
            </div>
        )
    }
}

export default App;

import React from 'react'
import { Route } from 'react-router-dom'
import Login from '../Login/Login';
import Welcome from '../Welcome/Welcome';

const AuthenticatedApp = () => {
    return (
        <div>
            <Route path="/login" exact component={Login} />
            <Route path="/welcome" exact component={Welcome} />
        </div>
    )
}

export default AuthenticatedApp
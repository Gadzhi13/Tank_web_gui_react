import React from 'react'
import { Route } from 'react-router-dom'
import Tank from '../Tank/Tank'
import Welcome from '../Welcome/Welcome'
import Camera from '../Camera/Camera'
import Settings from '../Settings/Settings'

const AuthenticatedApp = () => {
    return (
        <div>
            <Route path="/tank" exact component={Tank} />
            <Route path="/welcome" exact component={Welcome} />
            <Route path="/camera" exact component={Camera} />
            <Route path="/settings" exact component={Settings} />
        </div>
    )
}

export default AuthenticatedApp
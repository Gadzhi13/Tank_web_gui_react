import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import Tank from '../Tank/Tank'
import Welcome from '../Welcome/Welcome'
import Camera from '../Camera/Camera'
import Settings from '../Settings/Settings'
import './AuthenticatedApp.css'

const AuthenticatedApp = () => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, []);

    return (
        <div className='authenticated-app-container'>
            <CSSTransition
                in={mounted}
                timeout={300}
                classNames='load'
            >
                <Switch >
                    <Route path='/welcome' exact children={<Welcome />} />
                    <Route path='/tank' exact children={<Tank />} />
                    <Route path='/camera' exact children={<Camera />} />
                    <Route path='/settings' exact children={<Settings />} />
                </Switch>
            </CSSTransition>
        </div>
    )
}

export default AuthenticatedApp
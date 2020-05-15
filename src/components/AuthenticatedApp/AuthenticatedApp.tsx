import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import Tank from '../Tank/Tank'
import Welcome from '../Welcome/Welcome'
import Camera from '../Camera/Camera'
import Settings from '../Settings/Settings'
import './AuthenticatedApp.css'


const routes = [
    { path: '/welcome', Component: Welcome },
    { path: '/tank', Component: Tank },
    { path: '/camera', Component: Camera },
    { path: '/settings', Component: Settings }
]

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
                <div>
                    {routes.map(({ path, Component }) => (
                        <Route key={path} exact path={path}>
                            {({ match }) => (
                                <CSSTransition
                                    in={match != null}
                                    timeout={300}
                                    classNames='navfadeleft'
                                    unmountOnExit
                                >
                                    <Component />
                                </CSSTransition>
                            )}
                        </Route>
                    ))}
                </div>
            </CSSTransition>
        </div>
    )
}

export default AuthenticatedApp
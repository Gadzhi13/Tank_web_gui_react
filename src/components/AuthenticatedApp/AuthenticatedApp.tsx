import React, { useEffect } from 'react'
import { Route, useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { useDispatch, useSelector } from 'react-redux'

import Tank from '../Tank/Tank'
import Welcome from '../Welcome/Welcome'
import Camera from '../Camera/Camera'
import Settings from '../Settings/Settings'
import './AuthenticatedApp.css'
import { changePrevRouteId } from '../../actions/changePrevRouteId'
import reduxState from '../../types/reduxState';


const routes = [
    { id: 1, path: '/welcome', Component: Welcome },
    { id: 2, path: '/tank', Component: Tank },
    { id: 3, path: '/camera', Component: Camera },
    { id: 4, path: '/settings', Component: Settings }
]

const AuthenticatedApp = () => {

    const location = useLocation()
    const dispatch = useDispatch()
    let classNames: string = 'navfadeleft'
    let prevRouteId: number = useSelector((state: reduxState): number => state.prevRouteId)

    useEffect(() => {
        routes.map(({ id, path }) => {
            if (location.pathname === path) {
                classNames = (prevRouteId < id) ? 'navfadeleft' : 'navfaderight'
                console.log("inside authenticated inside if - " + id + " prev - " + prevRouteId + " classNames - " + classNames)
                dispatch(changePrevRouteId(id))
            }
        })
    })

    return (
        <div className='authenticated-app-container'>
            <div>
                {routes.map(route => (
                    <Route key={route.path} exact path={route.path}>
                        {({ match }) => (
                            <CSSTransition
                                in={match != null}
                                timeout={300}
                                classNames={classNames}
                                unmountOnExit
                            >
                                <div className='route-body-container'>
                                    <route.Component />
                                </div>
                            </CSSTransition>
                        )}
                    </Route>
                ))}
            </div>
        </div>
    )
}

export default AuthenticatedApp
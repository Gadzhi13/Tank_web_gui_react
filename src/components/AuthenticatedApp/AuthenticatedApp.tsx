import React, { useEffect } from 'react'
import { Route, useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { useDispatch, useSelector } from 'react-redux'

import Tank from '../Tank/Tank'
import Welcome from '../Welcome/Welcome'
import Camera from '../Camera/Camera'
import Settings from '../Settings/Settings'
import './AuthenticatedApp.css'
import reduxState from '../../types/reduxState'
import { changePrevRouteId } from '../../actions/changePrevRouteId'
import { animateLeft } from '../../actions/animateLeft'
import { animateRight } from '../../actions/animateRight'
import { setSafeToRender } from '../../actions/setSafeToRender'
import { setNotSafeToRender } from '../../actions/setNotSafeToRender'


const routes = [
    { id: 1, path: '/welcome', Component: Welcome },
    { id: 2, path: '/tank', Component: Tank },
    { id: 3, path: '/camera', Component: Camera },
    { id: 4, path: '/settings', Component: Settings }
]

const AuthenticatedApp = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const safeToRender: boolean = useSelector((state: reduxState): boolean => state.safeToRender)
    const prevRouteId: number = useSelector((state: reduxState): number => state.prevRouteId)
    const animationDirection: string = useSelector((state: reduxState): string => state.animationDirection)


    useEffect(() => {
        dispatch(setNotSafeToRender())
        routes.map(({ id, path }) => {
            if (location.pathname === path && prevRouteId !== id) {
                console.log("inside authenticated inside if - " + id + " prev - " + prevRouteId + " animationDirection - " + animationDirection + " safetorender - " + safeToRender)
                if (id < prevRouteId) {
                    dispatch(animateRight())
                    console.log("dispatched right")
                } else {
                    dispatch(animateLeft())
                    console.log("dispatched left")
                }
                console.log("inside authenticated inside if - " + id + " prev - " + prevRouteId + " animationDirection - " + animationDirection + " safetorender - " + safeToRender)
                dispatch(changePrevRouteId(id))
            }
            return null
        })
        dispatch(setSafeToRender())
    }, [prevRouteId, safeToRender, animationDirection, dispatch, location.pathname])

    return (
        <div className='authenticated-app-container'>
            <p>Prev Route ID = {prevRouteId} and animationDirection = {animationDirection}</p>
            {safeToRender && routes.map(route => (
                <Route key={route.path} exact path={route.path}>
                    {({ match }) => (
                        <CSSTransition
                            in={match != null}
                            timeout={300}
                            classNames={animationDirection}
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
    )
}

export default AuthenticatedApp
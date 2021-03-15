import React, { useState, useEffect } from 'react'
import { Location } from 'history'
import { useLocation, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTransition, animated } from 'react-spring'

import './AuthenticatedApp.css'
import routes from '../../util/routes/routes'
import ReduxState from '../../types/ReduxState'

const AuthenticatedApp = () => {
    const location: Location = useLocation()
    const animationDirection: string = useSelector((state: ReduxState): string => state.animationDirection)
    const [springProps, setSpringProps] = useState({
        from: { opacity: 0, transform: animationDirection === 'left' ? 'translate3d(100%,0,0)' : 'translate3d(-100%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: animationDirection === 'left' ? 'translate3d(-100%,0,0)' : 'translate3d(100%,0,0)' }
    })
    const transitions = useTransition(location, location => location.pathname, springProps)

    useEffect(() => {
        setSpringProps({
            from: { opacity: 0, transform: animationDirection === 'left' ? 'translate3d(100%,0,0)' : 'translate3d(-100%,0,0)' },
            enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
            leave: { opacity: 0, transform: animationDirection === 'left' ? 'translate3d(-100%,0,0)' : 'translate3d(100%,0,0)' }
        })
    }, [animationDirection])

    return (
        <div className='authenticated-app-container'>
            {transitions.map(({ item: location, props, key }) => (
                <animated.div key={key} style={props}>
                    <Switch location={location}>
                        {routes.map(route => (
                            <Route key={route.path} exact path={route.path}>
                                {() => (
                                    <div className='route-body-container'>
                                        <route.Component />
                                    </div>
                                )}
                            </Route>
                        ))}
                    </Switch>
                </animated.div>
            ))}
        </div>
    )
}

export default AuthenticatedApp
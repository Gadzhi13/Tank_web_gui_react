import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { animated, useTransition } from 'react-spring'

import Tank from '../../Tank/Tank'
import Welcome from '../../Welcome/Welcome'
import Camera from '../../Camera/Camera'
import Settings from '../../Settings/Settings'
import { AuthenticatedAppProps } from '../AuthenticatedApp'

interface AuthenticatedAppBodyProps extends AuthenticatedAppProps {}

const routes = [
    { id: 1, path: '/welcome', Component: Welcome },
    { id: 2, path: '/tank', Component: Tank },
    { id: 3, path: '/camera', Component: Camera },
    { id: 4, path: '/settings', Component: Settings }
]

const AuthenticatedAppBody = (props: AuthenticatedAppBodyProps) => {
    let springProps = {
        from: { opacity: 0, transform: 'translate3d(100%,0,0)'},
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)'},
        leave: { opacity: 0, transform: 'translate3d(-100%,0,0)'}
    }

    const transitions = useTransition(props.location, location => location.pathname, springProps)

    const updateProps = (direction: string): void => {
        springProps = {
            from: { opacity: 0, transform: direction === 'left' ? 'translate3d(100%,0,0)' : 'translate3d(-100%,0,0)' },
            enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
            leave: { opacity: 0, transform: direction === 'left' ? 'translate3d(-100%,0,0)' : 'translate3d(100%,0,0)' }
        }
    }

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

export default AuthenticatedAppBody
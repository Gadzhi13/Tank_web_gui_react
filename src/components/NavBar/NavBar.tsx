import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import { CSSTransition } from 'react-transition-group'
import { Location, LocationState, History } from 'history'
import { useSelector, useStore } from 'react-redux'
import { Store } from 'redux'
import { changePrevRouteId } from '../../actions/changePrevRouteId'

import './NavBar.css'
import routes from '../../util/routes/routes'
import reduxState from '../../types/reduxState'
import { animateRight } from '../../actions/animateRight'
import { animateLeft } from '../../actions/animateLeft'

const NavBar = () => {
    const active: string = 'nav-link nav-bar-text active'
    const inactive: string = 'nav-link nav-bar-text'
    const [toPath, setToPath] = useState('/welcome')
    const location: Location<LocationState> = useLocation()
    const history: History<LocationState> = useHistory()
    const store: Store = useStore()
    const prevRouteId: number = useSelector((state: reduxState): number => state.prevRouteId)

    const handleClick = (event: SyntheticEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        const e: HTMLAnchorElement = event.currentTarget
        if (location.pathname === e.pathname) return
        routes.map(({ id, path }): void => {
            if (path === e.pathname && id !== prevRouteId) {
                if (id < prevRouteId) {
                    store.dispatch(animateRight())
                } else {
                    store.dispatch(animateLeft())
                }
                store.dispatch(changePrevRouteId(id))
                setToPath(e.pathname)
            }
        })
    }

    useEffect(() => {
        history.push(toPath)
    }, [history, toPath])

    return (
        <CSSTransition
            timeout={300}
            classNames='load'
        >
            <Navbar variant='dark' className='navbar-container'>
                <Nav className='mr-auto'>
                    <Link className={location.pathname === '/welcome' ? active : inactive} to='/welcome' onClick={handleClick}>Welcome</Link>
                    <Link className={location.pathname === '/tank' ? active : inactive} to='/tank' onClick={handleClick}>Tank</Link>
                    <Link className={location.pathname === '/camera' ? active : inactive} to='/camera' onClick={handleClick}>Camera</Link>
                    <Link className={location.pathname === '/settings' ? active : inactive} to='/settings' onClick={handleClick}>Settings</Link>
                </Nav>
            </Navbar>
        </CSSTransition>
    )
}

export default NavBar
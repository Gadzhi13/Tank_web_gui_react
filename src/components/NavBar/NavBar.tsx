import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import './NavBar.css'
import { CSSTransition } from 'react-transition-group';
import { Location, LocationState } from 'history';

const NavBar = () => {
    const [mounted, setMounted] = useState(false)
    const location: Location<LocationState> = useLocation()
    const active: string = 'nav-link nav-bar-text active'
    const inactive: string = 'nav-link nav-bar-text'

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <CSSTransition
            in={mounted}
            timeout={300}
            classNames='load'
        >
        <Navbar variant='dark' className='navbar-container'>
            <Nav className='mr-auto'>
                <Link className={location.pathname === '/welcome' ? active : inactive} to='/welcome'>Welcome</Link>
                <Link className={location.pathname === '/tank' ? active : inactive} to='/tank'>Tank</Link>
                <Link className={location.pathname === '/camera' ? active : inactive} to='/camera'>Camera</Link>
                <Link className={location.pathname === '/settings' ? active : inactive} to='/settings'>Settings</Link>
            </Nav>
        </Navbar>
        </CSSTransition>
    )
}

export default NavBar
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import './NavBar.css'
import { CSSTransition } from 'react-transition-group';

const NavBar = () => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, []);

    return (
        <CSSTransition
            in={mounted}
            timeout={300}
            classNames='load'
        >
        <Navbar variant='dark' className='navbar-container'>
            <Nav className='mr-auto'>
                <Link className='nav-link nav-bar-text' to='/welcome'>Welcome</Link>
                <Link className='nav-link nav-bar-text' to='/tank'>Tank</Link>
                <Link className='nav-link nav-bar-text' to='/camera'>Camera</Link>
                <Link className='nav-link nav-bar-text' to='/settings'>Settings</Link>
            </Nav>
        </Navbar>
        </CSSTransition>
    )
}

export default NavBar
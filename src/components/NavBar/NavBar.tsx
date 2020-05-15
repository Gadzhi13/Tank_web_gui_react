import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const NavBar = () => {
    return (
        <Navbar variant='dark'>
            <Nav className='mr-auto'>
                <Link className='nav-link nav-bar-text' to='/tank'>Tank</Link>
                <Link className='nav-link nav-bar-text' to='/welcome'>Welcome</Link>
                <Link className='nav-link nav-bar-text' to='/camera'>Camera</Link>
                <Link className='nav-link nav-bar-text' to='/settings'>Settings</Link>
            </Nav>
        </Navbar>
    )
}

export default NavBar
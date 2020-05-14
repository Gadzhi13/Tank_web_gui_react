import React from 'react'
import { Redirect } from 'react-router-dom'
import Login from '../Login/Login'

const UnauthenticatedApp = () => {
    return (
        <div>
            <Redirect to='/login' />
            <Login />
        </div>
    )
}

export default UnauthenticatedApp
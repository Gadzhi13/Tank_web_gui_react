import React, { useState, useEffect } from 'react'

import Login from '../Login/Login'
import { CSSTransition } from 'react-transition-group';

const UnauthenticatedApp = () => {
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
            <Login />
        </CSSTransition>
    )
}

export default UnauthenticatedApp
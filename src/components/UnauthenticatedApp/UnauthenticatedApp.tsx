import React, { useState, useEffect } from 'react'
import { Store } from 'redux'
import { useStore } from 'react-redux'
import { CSSTransition } from 'react-transition-group'

import Login from '../Login/Login'
import { changePrevRouteId } from '../../actions/changePrevRouteId'

const UnauthenticatedApp = () => {
    const [mounted, setMounted] = useState(false)
    
    const store: Store = useStore()

    useEffect(() => {
        setMounted(true)
        store.dispatch(changePrevRouteId(1))
    }, [store]);
    
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
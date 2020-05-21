import React from 'react'
import { Dispatch } from 'redux'
import { Location } from 'history'

import AuthenticatedAppBody from './AuthenticatedAppBody/AuthenticatedAppBody'
import './AuthenticatedApp.css'

export interface AuthenticatedAppProps {
    location: Location,
    dispatch: Dispatch,
    prevRouteId: number
}

class AuthenticatedApp extends React.Component<AuthenticatedAppProps> {
    location = this.props.location
    dispatch = this.props.dispatch
    prevRouteId: number = this.props.prevRouteId

    render() {
        return <AuthenticatedAppBody {...this.props} />
    }
}

export default AuthenticatedApp
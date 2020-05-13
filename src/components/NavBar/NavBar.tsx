import React from 'react'

interface NavBarProps {
    isSignedIn?: boolean
}

export default class NavBar extends React.Component<NavBarProps> {

    render() {
        return this.props.isSignedIn ? (<div>NavBar component loaded!</div>) : null
    }
}
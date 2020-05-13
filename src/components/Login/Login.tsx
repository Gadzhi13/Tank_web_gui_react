import React from 'react'
import { Button, Form, FormGroup, FormLabel, FormControl, FormText } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import './Login.css'

interface LoginProps {}

interface LoginState {
    isSignedIn: boolean
}

export default class Login extends React.Component<LoginProps, LoginState> {

    constructor(props: LoginProps) {
        super(props)
        this.state = {
            isSignedIn: false
        }
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault()
        let target = event.currentTarget
        if (target.formUsername.value === "admin" && target.formPassword.value === "admin") {
            this.setState({
                isSignedIn: true
            })
        }
    }

    render() {

        if (this.state.isSignedIn) {
            return <Redirect to="/welcome" />
        }

        return (
            <div className="p-1 loginFormContainer">
                <Form className="form-login" onSubmit={this.handleSubmit.bind(this)}>
                    <FormText className="signinLabel">Please sign in</FormText>
                    <FormGroup controlId="formUsername">
                        <FormLabel className="sr-only">
                            Username
                        </FormLabel>
                        <FormControl size="lg" type="username" placeholder="Enter username"/>
                    </FormGroup>
                    <FormGroup controlId="formPassword">
                        <FormLabel className="sr-only">
                            Password
                        </FormLabel>
                        <FormControl size="lg" type="password" placeholder="Enter password"/>
                    </FormGroup>
                    <Button size="lg" variant="dark" className="loginButton" type="submit">Sign in</Button>
                </Form>
            </div>
        )
    }
}
import React, { useState } from 'react'
import { Button, Form, FormGroup, FormLabel, FormControl, FormText } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

import { useSignIn } from '../../util/auth/auth-service'
import './Login.css'
import { useDispatch, useSelector } from 'react-redux';
import State from '../../types/reduxState';

const Login = () => {

    const [usernameInvalid, setUsernameInvalid] = useState(false)
    const [passwordInvalid, setPasswordInvalid] = useState(false)
    const isSignedIn: boolean = useSelector((state: State) => state.isSignedIn)
    const dispatch = useDispatch()

    const useHandleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        let target = event.currentTarget
        let signedIn = useSignIn(target.formUsername.value, target.formPassword.value, dispatch)
        if (signedIn) {
            //ToDo change to redux
            setUsernameInvalid(false)
            setPasswordInvalid(false)
        } else {
            setUsernameInvalid(true)
            setPasswordInvalid(true)
        }
    }

    return (
        <div className="p-1 loginFormContainer">
            {isSignedIn ? <Redirect to="/welcome" /> : <br/>}
            <Form className="form-login" onSubmit={useHandleSubmit}>
                <FormText className="signinLabel">Please sign in</FormText>
                <FormGroup controlId="formUsername" >
                    <FormLabel className="sr-only">
                        Username
                    </FormLabel>
                    <FormControl size="lg" type="username" placeholder="Enter username" isInvalid={usernameInvalid} />
                </FormGroup>
                <FormGroup controlId="formPassword">
                    <FormLabel className="sr-only">
                        Password
                    </FormLabel>
                    <FormControl size="lg" type="password" placeholder="Enter password" isInvalid={passwordInvalid} />
                    <FormControl.Feedback type="invalid">
                        Username or password wrong
                    </FormControl.Feedback>
                </FormGroup>
                <Button size="lg" variant="dark" className="loginButton" type="submit">Sign in</Button>
            </Form>
        </div>
    )
}

export default Login
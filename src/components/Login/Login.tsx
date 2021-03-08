import React, { useState } from 'react'
import { Button, Form, FormGroup, FormLabel, FormControl, FormText } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Dispatch } from 'redux'
import { LocationState, History } from 'history'

import { useSignIn } from '../../util/auth/auth'
import './Login.css'

const Login = () => {

    const [usernameInvalid, setUsernameInvalid] = useState<boolean>(false)
    const [passwordInvalid, setPasswordInvalid] = useState<boolean>(false)
    const dispatch: Dispatch = useDispatch()
    const history: History<LocationState> = useHistory()

    const useHandleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        let target = event.currentTarget
        let signedIn = useSignIn(target.formUsername.value, target.formPassword.value, dispatch)
        if (signedIn) {
            setUsernameInvalid(false)
            setPasswordInvalid(false)
            history.push('/welcome')
        } else {
            setUsernameInvalid(true)
            setPasswordInvalid(true)
        }
    }


    return (
        <div className="login-container">
            <div className="p-1 login-form-container">
                <Form className="form-login" onSubmit={useHandleSubmit}>
                    <FormText className="sign-in-label">Please sign in</FormText>
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
                    <Button size="lg" variant="dark" type="submit">Sign in</Button>
                </Form>
            </div>
        </div>
    )
}

export default Login
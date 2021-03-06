import React, { useState } from 'react'
import { Form, FormControl, FormLabel,  Button, FormGroup } from 'react-bootstrap'

//TODO: add alphanumeric check on cleint ID

const Spotify = () => {

    const [clientId, setClientId] = useState('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        let clientIdBuffer = event.currentTarget.formControlId.value
        setClientId(clientIdBuffer)
        console.log(clientId)
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <FormGroup controlId="formControlId">
                    <FormLabel>Control Id:</FormLabel>
                    <FormControl size="lg" type="clientId" placeholder="Enter client ID"></FormControl>
                    <Button size="lg" variant="dark" type="submit">Submit</Button>
                </FormGroup>
            </Form>
        </div>
    )
}

export default Spotify
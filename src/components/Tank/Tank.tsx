import React, { useState } from 'react'
import { Button, Form, FormControl, Container, Row, Col } from 'react-bootstrap'

import './Tank.css'

const Tank = () => {
    const [speed, setSpeed] = useState<number>(100)

    const changeSpeed = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSpeed((e.target.value as unknown) as number)
    }

    return (
    <Container>
        <h4 className="title">Tank control page:</h4>
        <Row>
            <Col>
                <Button className="init" variant="success" /*onclick="init()"*/>Initialize connection</Button>
            </Col>
        </Row>
        <Row>
            <Col>
                <h5>Speed control:</h5>
                <Form>
                    <Row className="justify-content-sm-center controlRow">
                        <Col className="speedControl">
                            <FormControl type="range" className="custom-range" id="speedRange" value={speed} onChange={changeSpeed} />
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
        <Container>
            <Row className="justify-content-sm-center controlRow">
                <Col xs={true} sm={true} md={true} lg={true} xl={true} className="controlColumn noPadding">
                    <Button className="control" variant="dark" /*onclick="sendJson('fwdlft' )"*/>Forward Left</Button>
                </Col>
                <Col xs={true} sm={true} md={true} lg={true} xl={true} className="controlColumn noPadding">
                    <Button className="control" variant="dark" /*onclick="sendJson('fwd')"*/>Forward</Button>
                </Col>
                <Col xs={true} sm={true} md={true} lg={true} xl={true} className="controlColumn noPadding">
                    <Button className="control" variant="dark" /*onclick="sendJson('fwdright')"*/>Forward Right</Button>
                </Col>
            </Row>
            <Row className="justify-content-sm-center controlRow">
                <Col xs="12" sm={true} md={true} lg={true} xl={true} className="controlColumn noPadding">
                    <Button className="control" variant="dark" /*onclick="sendJson('spinleft')"*/>Spin Left</Button>
                </Col>
                <Col xs="12" sm={true} md={true} lg={true} xl={true} className="controlColumn noPadding">
                    <Button className="control" variant="warning" /*onclick="sendJson('stop')"*/>Stop</Button>
                </Col>
                <Col xs="12" sm={true} md={true} lg={true} xl={true} className="controlColumn noPadding">
                    <Button className="control" variant="dark" /*onclick="sendJson('spinright')"*/>Spin Right</Button>
                </Col>
            </Row>
            <Row className="justify-content-sm-center controlRow">
                <Col xs="12" sm={true} md={true} lg={true} xl={true} className="controlColumn noPadding">
                    <Button className="control" variant="dark" /*onclick="sendJson('revlft')"*/>Reverse Left</Button>
                </Col>
                <Col xs="12" sm={true} md={true} lg={true} xl={true} className="controlColumn noPadding">
                    <Button className="control" variant="dark" /*onclick="sendJson('rev')"*/>Reverse</Button>
                </Col>
                <Col xs="12" sm={true} md={true} lg={true} xl={true} className="controlColumn noPadding">
                    <Button className="control" variant="dark" /*onclick="sendJson('revright')"*/>Reverse Right</Button>
                </Col>
            </Row>
        </Container>
        <Row>
            <Col className="noPadding">
                <Button className="control" variant="danger" /*onclick="stop()"*/>Shut Down</Button>
            </Col>
        </Row>
        <Button variant="secondary" /*onclick="dump()"*/>Dump keys</Button>
    </Container>
    )
}

export default Tank
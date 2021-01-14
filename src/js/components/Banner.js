import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

export default class Banner extends React.Component {

    _getNominationsRemaining() {
        return 5 - Object.keys(this.props.nominations).length;
    }

    render() {
        return (
            <header className="header">
                <Container>
                    <Row>
                        <Col md={6}>
                            <h1 className="title">Shoppies</h1>
                            <p style={{fontSize: "25px"}}>Movie Awards For Entrepreneurs</p>
                        </Col>

                        <Col md={6} className="my-auto text-center">
                            <p style={{fontSize: "25px"}}><span>You have <b>{this._getNominationsRemaining()}</b> nominations left</span></p>
                        </Col>
                    </Row>
                </Container>
            </header>
        );
    }
}
import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

export default class Banner extends React.Component {

    _getNominationsRemaining() {
        if(Object.keys(this.props.nominations).length === 5) {
            return <span>You completed your nominations 🎉</span>;
        } else {
            return <span>You have {5 - Object.keys(this.props.nominations).length} nominations left</span>
        }
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
                            <p style={{fontSize: "25px"}}>{this._getNominationsRemaining()}</p>
                        </Col>
                    </Row>
                </Container>
            </header>
        );
    }
}
import React from 'react';

import { Jumbotron, Container, Row, Col, Button } from 'react-bootstrap';

export default class Nomination extends React.Component {
    render() {
        return (
            <Jumbotron style={{color: "#FFFFFF", backgroundColor: "#018060", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "10px", paddingRight: "10px"}}>
                <Container>
                    <Row>
                        <Col md={4} className="d-flex justify-content-center">
                            <img style={{display: "flex"}} src={this.props.nominations[this.props.nomination].Poster} height="150px" width="125px" alt="poster"/>
                        </Col>

                        <Col md={8} className="my-auto text-center">
                            <h5 className="title" style={{display: "block"}}>{this.props.nominations[this.props.nomination].Title}</h5>
                            <p>({this.props.nominations[this.props.nomination].Year})</p>
                            <Button className="de-nominate-btn" onClick={() => this.props._toggleNomination(this.props.nominations[this.props.nomination])}>De-Nominate</Button>
                        </Col>
                    </Row>
                </Container>
        </Jumbotron>
        );
    }
}
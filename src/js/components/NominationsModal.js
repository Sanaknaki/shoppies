import React from 'react';

import { Modal, Jumbotron, Container, Row, Col, Button } from 'react-bootstrap';

export default class NominationsModal extends React.Component {
    
    _renderNominations() {
        if(Object.keys(this.props.nominations).length === 0) {
            return <p>Start nominating some movies 🎥</p>
        } else {
            let list = [];
            for(let nomination in this.props.nominations) {
                list.push(
                    <Jumbotron style={{color: "#FFFFFF", backgroundColor: "#018060", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "10px", paddingRight: "10px"}}>
                        <Container>
                            <Row>
                                <Col md={4} className="d-flex justify-content-center">
                                    <img style={{display: "flex"}} src={this.props.nominations[nomination].Poster} height="150px" width="125px" alt="poster"/>
                                </Col>

                                {/* <Col md={2} className="my-auto text-left">
                                    <p style={{display: "block"}}>{this.props.nominations[nomination].Title}</p>
                                    <p>{this.props.nominations[nomination].Year}</p>
                                </Col> */}

                                <Col md={8} className="my-auto text-center">
                                    <h5 className="title" style={{display: "block"}}>{this.props.nominations[nomination].Title}</h5>
                                    <p>({this.props.nominations[nomination].Year})</p>
                                    <Button className="de-nominate-btn" onClick={() => this.props._toggleNomination(this.props.nominations[nomination])}>De-Nominate</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Jumbotron>
                );
            }

            return list;
        }
    }

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props._toggleShowModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Nominations</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {this._renderNominations()}
                </Modal.Body>

            </Modal>
        );
    }
}
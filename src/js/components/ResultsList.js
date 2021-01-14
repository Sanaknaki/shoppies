import React from 'react';

import { Jumbotron, Container, Col, Row, Button } from 'react-bootstrap';

export default class ResultsList extends React.Component {

    _renderButton(res) {
        var nominations = JSON.parse(localStorage.getItem('nominations'));

        if(!nominations) {
            return <Button className="nominate-btn" onClick={() => this.props._toggleNomination(res)}>Nominate</Button>;
        } else {
            if(nominations[res.imdbID]) {
                return <Button className="de-nominate-btn" onClick={() => this.props._toggleNomination(res)}>De-Nominate</Button>;
            } else if(Object.keys(nominations).length < 5){
                return <Button className="nominate-btn" onClick={() => this.props._toggleNomination(res)}>Nominate</Button>;
            } else {
                return null;
            }
        }

    };

    _renderList() {
        var nominations = JSON.parse(localStorage.getItem('nominations'));

        if(this.props.error) {
            return (
                <p>{this.props.error} ⚠️</p>
            );
        } else {
            if(this.props.results.length < 1) {
                return (
                    <p>Search for a movie to nominate 🥇</p>
                );
            } else {
                let list = [];
                for(let res of this.props.results) {
                    list.push(
                        <Jumbotron style={{backgroundColor: (nominations && nominations[res.imdbID]) ? "#018060" : "#F2F2F2"}}>
                            <Container>
                                <Row>
                                    <Col md={6}>
                                        <img style={{display: "flex"}} src={res.Poster} height="100%" width="auto" alt="poster"/>
                                    </Col>
    
                                    <Col md={6} className="my-auto text-center" style={{color: (nominations && nominations[res.imdbID]) ? "#FFFFFF" : "#3E4348"}}>
                                        <h3 className="title" style={{display: "block"}}>{res.Title}</h3>
                                        <p>({res.Year})</p>
                                        {this._renderButton(res)}
                                    </Col>
                                </Row>
                            </Container>
                        </Jumbotron>
                    );
                }
        
                return list;   
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                {this._renderList()}
            </React.Fragment>
        );
    }
}
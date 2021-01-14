import React from 'react';

import { Jumbotron, Container, Row, Col } from 'react-bootstrap';

export default class MovieResult extends React.Component {
    render() {
        return (
            <Jumbotron style={{paddingBottom: "0px"}} className={(this.props.isNominated) ? "nominated-jumbo" : "nominate-jumbo"}>
                <Container>
                    <Row>
                        <Col md={6} className="d-flex justify-content-center">
                            <img style={{display: "flex"}} src={this.props.res.Poster} height="100%" width="auto" alt="poster"/>
                        </Col>

                        <Col md={6} className="my-auto text-center" style={{color: (this.props.isNominated) ? "#FFFFFF" : "#3E4348"}}>
                            <h3 className="title" style={{display: "block"}}>{this.props.res.Title}</h3>
                            <p>({this.props.res.Year})</p>
                            {this.props._renderButton(this.props.res)}
                        </Col>
                    </Row>

                    {this.props._renderMovieDetails(this.props.res.imdbID, this.props.isNominated)}
            
                    <Row>
                        <Col md={3} style={{paddingTop: "15px", paddingBottom: "15px"}}><hr style={{backgroundColor: "white"}} /></Col>
                        <Col md={6} 
                            className="text-center" style={{paddingTop: "15px", paddingBottom: "15px", cursor: "pointer", color: (this.props.isNominated) ? "#FFFFFF" : "#3E4348"}} 
                            onClick={() => this.props._toggleViewMovie(this.props.res.imdbID)}>
                            View movie details
                        </Col>
                        <Col md={3} style={{paddingTop: "15px", paddingBottom: "15px"}}><hr style={{backgroundColor: "white"}} /></Col>
                    </Row>
                </Container>
        </Jumbotron>
        );
    }
}
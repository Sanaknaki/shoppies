import React from 'react';
import axios from 'axios';

import { URL } from '../../constants';

import { Jumbotron, Container, Col, Row, Button } from 'react-bootstrap';

export default class ResultsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movieData: {}
        }
    }
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

    async _toggleViewMovie(id) {
        const response = await axios.get(URL + `i=${id}`);
        
        if(response.data) {

            console.log(response.data);
            let movieData = {
                "director": response.data.Director,
                "rating": response.data.imdbRating,
                "boxOffice": response.data.BoxOffice,
                "plot": response.data.Plot,
                "imdbID": response.data.imdbID

            }

            this.setState({ movieData });
        }
    }

    _renderMovieDetails(id) {
        let { movieData } = this.state;

        if(Object.keys(movieData).length !== 0 && movieData.imdbID === id) {
            return (
                <Row style={{paddingTop: "20px", color: "#3E4348"}}>
                    <Col md={4}>
                        🎬 {movieData.director}
                    </Col>

                    <Col md={4}>
                        🌟 {movieData.rating}
                    </Col>

                    <Col md={4}>
                        💰 {movieData.boxOffice}
                    </Col>

                    <Col md ={12} style={{paddingTop: "20px"}}>
                        {movieData.plot}
                    </Col>
                </Row>
            );
        }

        return null;
    }

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
                        <Jumbotron style={{paddingBottom: "0px"}} className={((nominations && nominations[res.imdbID])) ? "nominated-jumbo" : "nominate-jumbo"}>
                            <Container>
                                <Row>
                                    <Col md={6} className="d-flex justify-content-center">
                                        <img style={{display: "flex"}} src={res.Poster} height="100%" width="auto" alt="poster"/>
                                    </Col>
    
                                    <Col md={6} className="my-auto text-center" style={{color: (nominations && nominations[res.imdbID]) ? "#FFFFFF" : "#3E4348"}}>
                                        <h3 className="title" style={{display: "block"}}>{res.Title}</h3>
                                        <p>({res.Year})</p>
                                        {this._renderButton(res)}
                                    </Col>
                                </Row>

                                {this._renderMovieDetails(res.imdbID)}
                        
                                <Row>
                                    <Col md={3} style={{paddingTop: "15px", paddingBottom: "15px"}}><hr style={{backgroundColor: "white"}} /></Col>
                                    <Col md={6} 
                                        className="text-center" style={{paddingTop: "15px", paddingBottom: "15px", cursor: "pointer", color: (nominations && nominations[res.imdbID]) ? "#FFFFFF" : "#3E4348"}} 
                                        onClick={() => this._toggleViewMovie(res.imdbID)}>
                                        View movie details
                                    </Col>
                                    <Col md={3} style={{paddingTop: "15px", paddingBottom: "15px"}}><hr style={{backgroundColor: "white"}} /></Col>
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
import React from 'react';
import axios from 'axios';

import { URL } from '../../constants';

import MovieResult from './MovieResult';

import { Col, Row, Button } from 'react-bootstrap';

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

    _renderMovieDetails(id, isNominated) {
        let { movieData } = this.state;
    
        if(Object.keys(movieData).length !== 0 && movieData.imdbID === id) {
            return (
                <Row style={{paddingTop: "20px", color: (isNominated) ? "#FFFFFF" : "#3E4348"}}>
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

                list = this.props.results.map((res, index) => {
                    return <MovieResult 
                            key={index}
                            res={res}
                            isNominated={((nominations && nominations[res.imdbID]) ? true : false)}
                            _renderMovieDetails={(id, is) => this._renderMovieDetails(id, is)}
                            _toggleViewMovie={(id) => this._toggleViewMovie(id)}
                            _renderButton={(res) => this._renderButton(res)}
                        />
                });
                // for(let res of this.props.results) {
                //     list.push(
                //         <MovieResult 
                //             res={res}
                //             isNominated={((nominations && nominations[res.imdbID]) ? true : false)}
                //             _renderMovieDetails={(id, is) => this._renderMovieDetails(id, is)}
                //             _toggleViewMovie={(id) => this._toggleViewMovie(id)}
                //             _renderButton={(res) => this._renderButton(res)}
                //         />
                //     );
                // }
        
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
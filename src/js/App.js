import React from 'react';
import axios from 'axios';

import { URL } from '../constants';

import Confetti from 'react-confetti'

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Banner from './components/Banner';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import NominationsMondal from './components/NominationsModal';

import { Container, Row, Col } from 'react-bootstrap';

import "../css/theme.css";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: "",

            nominations: localStorage.getItem('nominations') ? JSON.parse(localStorage.getItem('nominations')) : {},

            results: [],
            error: null,

            showModal: false,

            mode: 0,
        }
    };

    _toggleNomination(res) {
        // var nominate = { 'one': 1, 'two': 2, 'three': 3 };
        var nominations = localStorage.getItem('nominations') ? JSON.parse(localStorage.getItem('nominations')) : {};
        
        if(nominations && nominations[res.imdbID]) {
            delete nominations[res.imdbID];
        } else {
            nominations[res.imdbID] = res;
        }

        localStorage.setItem('nominations', JSON.stringify(nominations));

        this.setState({ nominations });
    };

    _updateQuery(e) {
        this._getResults(e.target.value);
        this.setState({ query: e.target.value });
    };

    async _getResults(query) {

        const response = await axios.get(URL + `s=${query}&type=movie`);

        if(query.length === 0) {
            this.setState({
                results: [],
                error: null,
            });
        } else {
            if(response.data.Error) {
                this.setState({
                    results: [],
                    error: response.data.Error
                });
            } else {
                this.setState({
                    results: response.data.Search,
                    error: null
                });
            }
        }
    };

    _toggleShowModal() {
        this.setState({showModal: !this.state.showModal})
    };

    _renderModal() {
        let { showModal } = this.state;

        if(showModal) {
            return <NominationsMondal showModal={this.state.showModal}/>
        }

        return null;
    };

    _renderConfetti() {
        let { nominations } = this.state;

        if(Object.keys(nominations).length === 5) {
            return <Confetti width={window.innerWidth-50} height={window.innerHeight} numberOfPieces={400} recycle={false}/>;
        }

        return null;
    };

    _toggleDarkLightMode() {
        let { mode } = this.state;

        if(mode === 0) {
            this.setState({
                mode: mode + 1,
            });
        } else {
            this.setState({
                mode: mode - 1,
            });
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className="main">
                    {this._renderConfetti()}
                    <NominationsMondal _toggleNomination={(res) => this._toggleNomination(res)} nominations={this.state.nominations} showModal={this.state.showModal} _toggleShowModal={() => this._toggleShowModal()}/>
                    <NavBar mode={this.state.mode} _toggleShowModal={() => this._toggleShowModal()} _toggleDarkLightMode={() => this._toggleDarkLightMode()} />
                    <Banner nominations={this.state.nominations} />
        
                    <Container style={{paddingTop: "50px"}}>
                        <Row>
                            <Col md={{span: 8, offset: 2}}>
                                <SearchBar query={this.state.query} _updateQuery={(e) => this._updateQuery(e)} />
                                <ResultsList _toggleNomination={(res) => this._toggleNomination(res)} results={this.state.results} error={this.state.error}/>
                            </Col>
                        </Row>
                    </Container>

                    <Footer />
                </div>
            </React.Fragment>
        );
    }
}

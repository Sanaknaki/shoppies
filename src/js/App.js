import React from 'react';
import axios from 'axios';

import { URL } from '../constants';

import Confetti from 'react-confetti'

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Banner from './components/Banner';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import NominationsModal from './components/modal/NominationsModal';

import { Container, Row, Col, Toast } from 'react-bootstrap';

import "../css/theme.css";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: "",
            fetching: false,
            nominations: localStorage.getItem('nominations') ? JSON.parse(localStorage.getItem('nominations')) : {},

            results: [],
            error: null,

            showModal: false,

            notification: null
        }
    };

    _toggleNomination(res) {
        var nominations = localStorage.getItem('nominations') ? JSON.parse(localStorage.getItem('nominations')) : {};
        let nominated = false;

        if(nominations && nominations[res.imdbID]) {
            delete nominations[res.imdbID];
            
        } else {
            nominations[res.imdbID] = res;
            nominated = true;
        }

        localStorage.setItem('nominations', JSON.stringify(nominations));

        this.setState({ nominations });

        this._appendNotification(res, nominated);
    };

    _appendNotification(res, nominated=false) {
        let { notification } = this.state;

        let body = null;

        if(nominated) {
            body = (
                <React.Fragment>
                    <Toast.Header closeButton={false}>
                        👍🏽 &nbsp;&nbsp; <strong>Nominated!</strong>
                    </Toast.Header>
                    <Toast.Body>You nominated {res.Title}!</Toast.Body>
                </React.Fragment>
            );
        } else {
            body = (
                <React.Fragment>
                    <Toast.Header closeButton={false}>
                        👎🏽 &nbsp;&nbsp; <strong>Removed Nominated!</strong>
                    </Toast.Header>
                    <Toast.Body>You removed the nomination for {res.Title}!</Toast.Body>
                </React.Fragment>
            );
        }

        notification = (
            <Toast 
                style={{
                    minWidth: "350px",
                    zIndex: "9999",
                    position: "fixed",
                    bottom: 10,
                    right: 10,
                }}
                onClose={() => this.setState({notification: null})} 
                show={true} 
                delay={6000} 
                
                autohide>
                {body}
            </Toast>
        );

        this.setState({ notification });
    };

    _renderNotifications() {
        let { notification } = this.state;

        return (
            <React.Fragment>
                {notification}
            </React.Fragment>
        )
    }

    _updateQuery(e) {
        if(e.target.value.length > 0) {
            this._getResults(e.target.value);
            this.setState({ query: e.target.value });
        } else {
            this.setState({
                results: [],
                query: "",
                error: null
            });
        }
    };

    async _getResults(query) {
        this.setState({ fetching: true });
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

        this.setState({ fetching: false });
    };

    _toggleShowModal() {
        this.setState({showModal: !this.state.showModal})
    };

    _renderModal() {
        let { showModal } = this.state;

        if(showModal) {
            return <NominationsModal showModal={this.state.showModal}/>
        }

        return null;
    };

    _renderConfetti() {
        let { nominations } = this.state;

        if(Object.keys(nominations).length === 5) {
            return <Confetti style={{position: "absolute"}} height={window.innerHeight} numberOfPieces={400} recycle={false}/>;
        }

        return null;
    };

    render() {

        let { mode, fetching, nominations, showModal, results, query, error, notification } = this.state;

        return (
            <React.Fragment>
                {this._renderConfetti()}
                <div className="main">
                    <NominationsModal _toggleNomination={(res) => this._toggleNomination(res)} nominations={nominations} showModal={showModal} _toggleShowModal={() => this._toggleShowModal()}/>
                    <NavBar mode={mode} _toggleShowModal={() => this._toggleShowModal()} _toggleDarkLightMode={() => this._toggleDarkLightMode()} />
                    {(notification) ? this._renderNotifications() : null}
                    <Banner nominations={nominations} />
                    <Container style={{paddingTop: "50px"}}>
                        <Row>
                            <Col md={{span: 8, offset: 2}}>
                                <SearchBar query={query} _updateQuery={(e) => this._updateQuery(e)} />
                                <ResultsList fetching={fetching} _toggleNomination={(res) => this._toggleNomination(res)} results={results} error={error}/>
                            </Col>
                        </Row>
                    </Container>
                    <Footer />
                </div>
            </React.Fragment>
        );
    }
}

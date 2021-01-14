import React from 'react';
import Icon from '../../img/icon.png';

import { Navbar, Nav } from 'react-bootstrap';

export default class NavBar extends React.Component {
    constructor(props) { 
        super(props);

        this.state = {
            mode: "light",
            showModal: false
        }
    }

    render() {
        return (
            <React.Fragment>
                <Navbar fixed={"top"}>
                    <Navbar.Brand><img src={Icon} className="app-logo" height="500px" width="auto" alt="logo" /></Navbar.Brand>
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto" />
                        <Nav.Link style={{fontSize: "25px"}} onClick={() => this.props._toggleShowModal()}>🏅</Nav.Link>
                        <Nav.Link style={{fontSize: "25px"}} href="#home">🌚</Nav.Link>
                    </Navbar.Collapse>
                </Navbar>
            </React.Fragment>
        );
    }
}
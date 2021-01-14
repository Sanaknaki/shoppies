import React from 'react';

import { Modal } from 'react-bootstrap';

import Nomination from '../Nomination';

export default class NominationsModal extends React.Component {
    
    _renderNominations() {
        if(Object.keys(this.props.nominations).length === 0) {
            return <p>Start nominating some movies 🎥</p>
        } else {
            let list = [];

            for(let nomination in this.props.nominations) {
                list.push(
                    <Nomination 
                        nominations={this.props.nominations}
                        nomination={nomination}
                        _toggleNomination={(nom) => this.props._toggleNomination(nom)}
                    />
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
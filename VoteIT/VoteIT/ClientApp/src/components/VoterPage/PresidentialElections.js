import React, { Component } from 'react';
import './VoterPage.css';
import { NavMenuVoter } from './NavMenuVoter';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
export class Presidential extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            showModal: false,
            presidentialCandidates: []
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

        axios.get('https://localhost:44319/Users').then(res => {
            this.setState({ presidentialCandidates: res.data });
            console.log(res.data);
        });
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    renderButton() {
        return this.state.presidentialCandidates.map((candidate, index) => {
            const { id, firstName, lastName, politicalParty, personalDescription } = candidate //destructuring
            return (
                    <button key={id} className="column" onClick={this.handleOpenModal}>
                            <h2>{firstName}  : {lastName}</h2>
                            <h2>{politicalParty}</h2>
                            <p>{personalDescription}</p>
                    </button>
            )
        })
    }

    render() {
        return (
            <div>
                <NavMenuVoter />
                <h2>Presidential Page</h2>
                <div className="row">
                    {this.renderButton()}
                </div>
                <Modal className="modalBox" isOpen={this.state.showModal} contentLabel="Minimal Modal Example">
                    <h2>Your candidate for presidential is: </h2>
                    <div>
                        <button type="submit" id="ModalBoxCloseButton" onClick={this.handleCloseModal}>Close Vote</button>
                        <button type="submit" id="ModalBoxSendVoteButton" > Send Vote</button>
                    </div>

                </Modal>
            </div>
        );
    }
}

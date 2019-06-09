﻿import React, { Component } from 'react';
import './VoterPage.css';
import { Voter } from './VoterPage';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

export class Presidential extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            showModal: false,
            firstName: '',
            presidentialCandidates: []
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleSendVote = this.handleSendVote.bind(this);

        axios.get('https://localhost:44319/Users/GetAllCandidatesForPresidentials').then(res => {
            this.setState({ presidentialCandidates: res.data });
            console.log(res.data);
        });
    }

    handleOpenModal(ev, data) {
        this.setState({ showModal: true });
        this.setState({ firstName: data.firstName });
        localStorage.setItem('candidateToBeVoted', JSON.stringify(data));
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    handleSendVote() {
        var candidateToBeVoted = JSON.parse(localStorage.getItem('candidateToBeVoted'));
        var voter = JSON.parse(localStorage.getItem('user'));

        const voterId = voter.id;
        const candidateId = candidateToBeVoted.id;
        const sesionId = 2;


        var today = new Date();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        console.log(dateTime);
        axios.post('https://localhost:44319/VotingHistory/PostNewVote', {
            voterId,
            candidateId,
            sesionId,
            dateTime
        }).then(res => {
            console.log(res);
            this.setState({ showModal: false });
            toast.success('Your vote was send. !', {
                containerId: 'A',
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1500
            });
        })
            .catch(error => {
                if (error.response.status == 409) {
                    this.setState({ showModal: false });
                    console.log("You voted already");
                    toast.error('Already voted !', {
                        containerId: 'B',
                        position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: 1500
                    });
                };
            });
    }

    renderButton() {
        return this.state.presidentialCandidates.map((candidate, index) => {
            const { id, firstName, lastName, politicalParty, personalDescription } = candidate //destructuring
            var data = { id, firstName, lastName, politicalParty };
            return (
                <button  key={id} className="column" onClick={((ev) => this.handleOpenModal(ev, data))}>
                            <h2>{firstName}  : {lastName}</h2>
                            <h2>{politicalParty}</h2>
                            <p>{personalDescription}</p>
                    </button>
            )
        })
    }

    render() {
        var candidate = JSON.parse(localStorage.getItem('candidateToBeVoted'));
        return (
            <div>
                <Voter />
                <h2>Presidential Page</h2>
                <div className="row">
                    {this.renderButton()}
                </div>
                <Modal className="modalBox" isOpen={this.state.showModal} contentLabel="Minimal Modal Example">
                    <p>Your candidate for presidential is: <b>{candidate.firstName}  {candidate.lastName}</b> from <b>{candidate.politicalParty}</b> </p>
                    <p> Are you sure?</p>
                    <div>
                        <button type="submit" id="ModalBoxCloseButton" onClick={this.handleCloseModal}>Close Vote</button>
                        <button type="submit" id="ModalBoxSendVoteButton" onClick={this.handleSendVote}> Send Vote</button>
                    </div>
                </Modal>
                <ToastContainer enableMultiContainer containerId={'A'} />
                <ToastContainer enableMultiContainer containerId={'B'} />
            </div>
        );
    }
}

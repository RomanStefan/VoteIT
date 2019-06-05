import React, { Component } from 'react';
import './VoterPage.css';
import { Voter } from './VoterPage';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

export class Local extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            showModal: false,
            firstName: '',
            localCandidates: []
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleSendVote = this.handleSendVote.bind(this);


        var voter = JSON.parse(localStorage.getItem('user'));
        var cityId = parseInt(voter.cityId); 
        var name = voter.firstName;
        axios.post('https://localhost:44319/Users/GetUsersByCityId', { cityId, name }  ).then(res => {
            this.setState({ localCandidates: res.data });
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

        var voterId = voter.id;
        var candidateId = candidateToBeVoted.id;
        var sesionId = 1;
        var cityId = voter.cityId;

        var today = new Date();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        console.log(dateTime);
        axios.post('https://localhost:44319/VotingHistory/PostNewVote', {
            voterId,
            candidateId,
            sesionId,
            dateTime,
            cityId
        }).then(res => {
            console.log(res);
            this.setState({ showModal: false });
        });
    }

    renderButton() {
        return this.state.localCandidates.map((candidate, index) => {
            const { id, firstName, lastName, politicalParty, personalDescription, cityId } = candidate //destructuring
            var data = { id, firstName, lastName, politicalParty };
            return (
                <button key={id} className="column" onClick={((ev) => this.handleOpenModal(ev, data))}>
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
                <h2>Local Page</h2>
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
            </div>
        );
    }
}

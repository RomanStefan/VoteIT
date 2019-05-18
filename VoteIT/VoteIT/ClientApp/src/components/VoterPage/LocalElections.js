import React, { Component } from 'react';
import './VoterPage.css';
import { NavMenuVoter } from './NavMenuVoter';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
export class Local extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localCandidates: []
        };
        axios.get('https://localhost:44319/Users').then(res => {
            this.setState({ localCandidates: res.data });
            console.log(res.data);
        });

    }

    renderButton() {
        return this.state.localCandidates.map((candidate, index) => {
            const { id, firstName, lastName } = candidate //destructuring
            return (
                <button key={id} className="column">
                    <h2>{firstName}  : {lastName}</h2>
                </button>
            )
        })
    }

    render() {
        return (
            <div>
                <NavMenuVoter />
                <h2>Local Page</h2>
                <div className="row">
                    {this.renderButton()}
                </div>
            </div>
        );
    }
}

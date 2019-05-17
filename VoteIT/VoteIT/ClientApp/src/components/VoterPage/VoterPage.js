import React, { Component } from 'react';
import './VoterPage.css';
import { NavMenuVoter } from './NavMenuVoter';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
export class Voter extends Component {
    render() {
        var user = JSON.parse(localStorage.getItem('user'));
        console.log(user.userType);
        return (
            <div>
                <NavMenuVoter/>
                <h2>Voter Page</h2>
                <div className="row">
                    <button className="column">
                        <h2>Candidate 1</h2>
                        <p>Liviut</p>
                    </button>
                    <button className="column">
                        <h2>Candidate 2</h2>
                        <p>Sorinel.</p>
                    </button>
                    <button className="column">
                        <h2>Candidate 3</h2>
                        <p>Some text..</p>
                    </button>
                    <button className="column" >
                        <h2>Candidate 4</h2>
                        <p>Some text..</p>
                    </button>
                </div>
            </div>
        );
    }
}

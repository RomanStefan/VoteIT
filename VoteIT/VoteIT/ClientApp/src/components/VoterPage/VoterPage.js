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
            </div>
        );
    }
}

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { NavMenuCandidate } from './NavMenuCandidate';
export class Candidate extends Component {
    render() {
        return (
            <div>
                <NavMenuCandidate />
                <h2 >Candidate Page</h2>
            </div>
        );
    }
}

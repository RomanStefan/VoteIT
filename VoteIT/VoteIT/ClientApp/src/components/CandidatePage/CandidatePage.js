import React, { Component } from 'react';
import axios from 'axios';
import { CandidateLayout } from './CandidateLayout';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, FormGroup, Label, Input, Form } from 'reactstrap';
import { ChartPie } from '../SecondComponents/ChartPie';

export class Candidate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            availableSessions: [],
        };

        axios.get('https://localhost:44319/VotingSessions/AvailableSessions').then(res => {
            this.setState({ availableSessions: res.data });
            console.log(res.data);
        });
    }

    displayAvailableSessions() {
        if (this.state.availableSessions.length == 0) {
            return (
                <p>Here are no available Sessions</p>
            );
        }
        else {
            return this.state.availableSessions.map((session, index) => {
                const { idSession, sesionName } = session //destructuring
                return (
                    <p><b>{sesionName}</b> are open for this moment</p>
                )
            })
        }
    }


    render() {

        return (
            <div>
                <CandidateLayout />
                <main style={{ marginTop: '63px' }}>
                    <Label>
                        {this.displayAvailableSessions()}
                    </Label>
                    <div>
                        <ChartPie />
                    </div>
                </main>
            </div>
        );
    }
}

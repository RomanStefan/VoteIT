import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, FormGroup, Label, Input, Form } from 'reactstrap';
import axios from 'axios';
import { LayoutAdmin } from './LayoutAdmin';
import './LayoutAdmin.css';
import { ChartPie } from '../SecondComponents/ChartPie';
import { BackDrop } from './BackDrop/BackDrop'

export class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            availableSessions: [],
            voteResults: [],
            candidates: []
        };

        axios.get('https://localhost:44319/VotingSessions/AvailableSessions').then(res => {
            this.setState({ availableSessions: res.data });
        });

        axios.get('https://localhost:44319/VotingHistory/GetTheResults').then(res => {
            this.setState({ voteResults: res.data });
            console.log(res.data);
            var candidates = [];
            for (var i = 0; i < res.data.length; i++) {

                var candidate = {
                    title: "",
                    value: 0,
                    color:""
                };
                candidate.title = res.data[i].candidateName;
                candidate.value = res.data[i].numberOfVotes;

                switch (res.data[i].politicalParty) {
                    case 'PSD':
                        candidate.color = "#ff4000";
                        break;
                    case 'PNL':
                        candidate.color = "#ffff00";
                        break;
                    case 'USR':
                        candidate.color = "#00ffff";
                        break;
                }
                candidates.push(candidate)
            }
            this.setState({ candidates: candidates });
            console.log(candidates);
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
                    <div>
                        <p><b>{sesionName}</b> are open for this moment</p>
                        <ChartPie />
                    </div>
                    
                )
            })
        }
    }

    render() {
        return (
            <div>
                <LayoutAdmin />
                <main style={{ marginTop: '63px' }}>
                    <h2 >Admin Page</h2>
                    <Label>
                        {this.displayAvailableSessions()}
                    </Label>
                </main>
            </div>
        );
    }
}

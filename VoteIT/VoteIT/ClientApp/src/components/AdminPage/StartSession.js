import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import { Admin } from './AdminPage';
import { Local } from '../VoterPage/LocalElections';

export class StartSession extends Component {
    constructor(props) {
        var user = JSON.parse(localStorage.getItem('user'));
        super(props);
        this.state = {
            sessionName: '',
            local: true,
            presidential: true,
            sessions: []
        };

        axios.get('https://localhost:44319/VotingSessions').then(res => {
            this.setState({ sessions: res.data });
            console.log(res.data);
        });


        this.handleSessionNameChange = this.handleSessionNameChange.bind(this);
        this.LocalChange = this.LocalChange.bind(this);
        this.PresidentialChange = this.PresidentialChange.bind(this);
        this.createSession = this.startSession.bind(this);
    }

    handleSessionNameChange(evt) {
        this.setState({ sessionName: evt.target.value });
    }

    LocalChange(evt) {
        this.setState({ local: !this.state.local })
        console.log(this.state.local);
    }

    PresidentialChange(evt) {
        this.setState({ presidential: !this.state.presidential })
        console.log(this.state.presidential);
    }


    startSession() {
        const sessionName = this.state.sessionName;
        const id = 1;
        console.log(sessionName);
        axios.post('https://localhost:44319/VotingSessions/CreateSession', {
            id,
            sessionName
        }
        ).then(res => {
            console.log(res);
        });
    }

    render() {
        return (
            <div>
                <Admin />
                <form>
                    <h2 className="headertekst">Start The Session</h2>

                    <div class="checkbox">
                        <input id="checkbox1" class="styled" type="checkbox" onChange={this.LocalChange}/>
                            <label for="checkbox1">
                                Local Elections
                        </label>
                    </div>

                    <div class="checkbox">
                        <input id="checkbox1" class="styled" type="checkbox" onChange={this.PresidentialChange}/>
                        <label for="checkbox1">
                            Presidential Elections
                        </label>
                    </div>

                    <form>
                        <div>
                            <label for="bday">Select Session Date: </label>
                            <input type="date" id="bday" name="bday"/>
                        </div>
                    </form>

                    <form action="/admin" >
                        <button className="SaveButton" type="submit" onClick={this.startSession}>Start Session</button>
                    </form>
                </form>
            </div>
        );
    }
}
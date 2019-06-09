import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, FormGroup, Label, Input, Form } from 'reactstrap';
import { LayoutAdmin } from './LayoutAdmin';

export class StartSession extends Component {
    constructor(props) {
        var user = JSON.parse(localStorage.getItem('user'));
        super(props);
        this.state = {
            sessionName: '',
            sessions: [],
            availableSessions: [],
            local: false,
            presidential: false,
            data: ''
        };

        axios.get('https://localhost:44319/VotingSessions/AvailableSessions').then(res => {
            this.setState({ availableSessions: res.data });
            console.log(res.data);
        });


        this.handleSessionNameChange = this.handleSessionNameChange.bind(this);
        this.LocalChange = this.LocalChange.bind(this);
        this.PresidentialChange = this.PresidentialChange.bind(this);
        this.handleData = this.handleData.bind(this);

        this.startSession = this.startSession.bind(this);
    }

    handleSessionNameChange(evt) {
        this.setState({ sessionName: evt.target.value });
    }

    LocalChange(evt) {
        this.setState({ local: evt.target.checked })
        console.log(evt.target.checked);
    }

    PresidentialChange(evt) {
        this.setState({ presidential: evt.target.checked })
        console.log(evt.target.checked);
    }

    handleData(evt) {
        this.setState({ data: evt.target.value });
        console.log(evt.target.value);
    }

    startSession() {
        const local = this.state.local;
        const presidential = this.state.presidential;
        const data = this.state.data;
        axios.put('https://localhost:44319/VotingSessions/StartSession', {
            local,
            presidential,
            data
        }).then(res => {
            console.log(res);
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
                    <p><b>{sesionName}</b> is already open.</p>
                )
            })
        }
    }


    render() {
        return (
            <div>
                <LayoutAdmin />
                <main style={{ marginTop: '63px' }}>
                <h2 className="headertekst">Start The Session</h2>
                <Form>
                    <Label>
                        {this.displayAvailableSessions()}
                    </Label>
                    <FormGroup class="checkbox">
                        <Input id="checkbox1" class="styled" type="checkbox" checked={this.state.local} onChange={this.LocalChange}/>
                        <Label >
                                Local Elections
                        </Label >
                    </FormGroup>

                    <FormGroup class="checkbox">
                        <Input id="checkbox1" class="styled" type="checkbox" checked={this.state.presidential} onChange={this.PresidentialChange}/>
                        <Label >
                            Presidential Elections
                        </Label >
                    </FormGroup>

                    <FormGroup>
                        <Label Label for="bday">Select Session Date: </Label >
                        <input type="date" id="bday" name="bday" onChange={this.handleData}/>
                    </FormGroup>

                    <FormGroup action="/admin" >
                        <button className="SaveButton" type="submit" onClick={this.startSession}>Start Session</button>
                    </FormGroup>
                </Form>
                </main>
            </div>
        );
    }
}
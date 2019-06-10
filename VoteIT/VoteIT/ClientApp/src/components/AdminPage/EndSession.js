import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, FormGroup, Label, Input, Form } from 'reactstrap';
import { LayoutAdmin } from './LayoutAdmin';

export class EndSession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            availableSessions: [],
            local: false,
            presidential: false
        };

        axios.get('https://localhost:44319/VotingSessions/AvailableSessions').then(res => {
            this.setState({ availableSessions: res.data });
            console.log(res.data);
        });

        this.LocalChange = this.LocalChange.bind(this);
        this.PresidentialChange = this.PresidentialChange.bind(this);

        this.endSession = this.endSession.bind(this);
    }

    LocalChange(evt) {
        this.setState({ local: evt.target.checked })
        console.log(evt.target.checked);
    }

    PresidentialChange(evt) {
        this.setState({ presidential: evt.target.checked })
        console.log(evt.target.checked);
    }

    endSession() {
        const local = this.state.local;
        const presidential = this.state.presidential;
        const data = this.state.data;
        axios.put('https://localhost:44319/VotingSessions/EndSession', {
            local,
            presidential
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
                const { idSession, sesionName} = session //destructuring
                return (
                    <p><b>{sesionName}</b> is open for this moment</p>
                )
            })
        }
    }


    render() {
        return (
            <div>
                <LayoutAdmin />
                <main style={{ marginTop: '63px' }}>
                    <h2 className="headertekst">End The Session</h2>
                <Form>
                    <Label>
                        {this.displayAvailableSessions()}
                    </Label>

                    <div>
                         <p>Select which session you want to close:</p>
                    </div>
                    <FormGroup className="checkbox">
                        <Input id="checkbox1" className="styled" type="checkbox" checked={this.state.local} onChange={this.LocalChange} />
                        <Label >
                            Local Elections
                        </Label >
                    </FormGroup>

                    <FormGroup className="checkbox">
                        <Input id="checkbox1" className="styled" type="checkbox" checked={this.state.presidential} onChange={this.PresidentialChange} />
                        <Label >
                            Presidential Elections
                        </Label >
                    </FormGroup>

                    <FormGroup action="/admin" >
                        <button className="SaveButton" type="submit" onClick={this.endSession}>End Session</button>
                    </FormGroup>
                    </Form>
                </main>
            </div>
        );
    }
}
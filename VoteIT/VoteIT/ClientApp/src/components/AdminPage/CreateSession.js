import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, FormGroup, Label, Input, Form } from 'reactstrap';
import { LayoutAdmin } from './LayoutAdmin';

export class CreateSession extends Component {
    constructor(props) {
        var user = JSON.parse(localStorage.getItem('user'));
        super(props);
        this.state = {
            sessionName: ''
        };


        this.handleSessionNameChange = this.handleSessionNameChange.bind(this);
        this.createSession = this.createSession.bind(this);
    }

    handleSessionNameChange(evt) {
        this.setState({ sessionName: evt.target.value });
    }


    createSession() {
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
        var user = JSON.parse(localStorage.getItem('user'));
        return (
            <div>
                <LayoutAdmin />
                <main style={{ marginTop: '63px' }}>
                    <h2 className="headertekst">Create New Session</h2>
                <Form>
                    
                    <div className="form-group">
                        <Label>Session Name</Label>
                        <Input type="text" className="form-control" placeholder="Enter the new session type" onChange={this.handleSessionNameChange} />
                    </div>

                    <Form action="/admin" >
                        <button className="SaveButton" type="submit" onClick={this.createSession}>Create Session</button>
                    </Form>
                 </Form>
                </main>
            </div>
        );
    }
}
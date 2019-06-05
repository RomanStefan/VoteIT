import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import { Admin } from './AdminPage';

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
                <Admin />
                <form>
                    <h2 className="headertekst">Create New Session</h2>
                    <div className="form-group">
                        <label>Session Name</label>
                        <input type="text" className="form-control" placeholder="Enter the new session type" onChange={this.handleSessionNameChange} />
                    </div>

                    <form action="/admin" >
                        <button className="SaveButton" type="submit" onClick={this.createSession}>Create Session</button>
                    </form>
                </form>
            </div>
        );
    }
}
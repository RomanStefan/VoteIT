import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, FormGroup, Label, Input, Form } from 'reactstrap';
import axios from 'axios';
import { LayoutAdmin } from './LayoutAdmin';
import { SideBar } from './SideBar/SideBar';
import { BackDrop } from './BackDrop/BackDrop'

export class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            availableSessions: []
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
                    <h2 >Admin Page</h2>
                    <Label>
                        {this.displayAvailableSessions()}
                    </Label>
                </main>
            </div>
        );
    }
}

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, FormGroup, Label, Input, Form } from 'reactstrap';
import { ToolbarVoter } from './Toolbar/ToolbarVoter';
import { SideBar } from './SideBar/SideBar';
import { BackDrop } from './BackDrop/BackDrop'
import { VoterLayout } from './VoterLayout';

export class Voter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideBarOpen: false,
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
        let backdrop;

        if (this.state.sideBarOpen) {
            backdrop = <BackDrop click={this.backdropClickHandler} />
        }
        return (
            <div>
                <VoterLayout />
                <main style={{ marginTop: '63px' }}>
                    <h2 >Voter Page</h2>
                    <Label>
                        {this.displayAvailableSessions()}
                    </Label>
                </main>
            </div>
        );
    }
}

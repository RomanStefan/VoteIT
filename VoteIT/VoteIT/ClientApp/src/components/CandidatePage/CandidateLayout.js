import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Toolbar } from './Toolbar/Toolbar';
import { SideBar } from './SideBar/SideBar';
import { BackDrop } from './BackDrop/BackDrop'

export class CandidateLayout extends Component {
    state = {
        sideBarOpen: false
    };

    drawerToogleClickHandler = () => {
        this.setState((prevState) => {
            return { sideBarOpen: !prevState.sideBarOpen };
        });
    };

    backdropClickHandler = () => {
        this.setState({ sideBarOpen: false });
    };

    render() {
        let backdrop;

        if (this.state.sideBarOpen) {
            backdrop = <BackDrop click={this.backdropClickHandler} />
        }
        return (
            <div style={{ height: '100%' }}>
                <Toolbar drawerClickHandler={this.drawerToogleClickHandler} />
                <SideBar show={this.state.sideBarOpen} />
                {backdrop}
                <main style={{ marginTop: '63px' }}>
                    <h2 >Candidate Page</h2>
                </main>
            </div>
        );
    }
}

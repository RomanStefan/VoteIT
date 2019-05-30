import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { NavMenuCandidate } from './NavMenuCandidate';
import { SideBarCandidate } from './SideBarCandidate';
import { BackDrop } from 'D:/VoteIT/VoteIT/VoteIT/ClientApp/src/resources/Backdrop/BackDrop';

export class Candidate extends Component {
    state = {
        sideBarOpen: false
    };

    drawerToogleClickHandler = () => {
        this.setState((prevState) => {
            return { sideBarOpen: !prevState.sideBarOpen };
        });
    };

    backDropCLickHandler = () => {
        this.setState({ sideBar: false });
    }

    render() {
        let sideBar;
        let backdrop;

        if (this.state.sideBarOpen) {
            sideBar = <SideBarCandidate />;
            backdrop = <BackDrop click={this.backDropCLickHandler}/>;
        }
        return (
            <div style={{height: '100%'}}>
                <NavMenuCandidate drawerClickHandler={this.drawerToogleClickHandler}/>
                {sideBar}
                {backdrop}
                <main style={{marginTop: '63px'}}>
                    <h2 >Candidate Page</h2>
                </main>  
            </div>
        );
    }
}

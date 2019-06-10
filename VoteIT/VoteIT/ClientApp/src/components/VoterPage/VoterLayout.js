import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { ToolbarVoter } from './Toolbar/ToolbarVoter';
import { SideBar } from './SideBar/SideBar';
import { BackDrop } from './BackDrop/BackDrop';

export class VoterLayout extends Component
{
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

        if (this.state.sideBarOpen)
        {
            backdrop = < BackDrop click ={ this.backdropClickHandler} />
        }
        return (
            <div style ={{ height: '100%' }}>    
                    <ToolbarVoter drawerClickHandler ={ this.drawerToogleClickHandler}/>       
                       <SideBar show ={ this.state.sideBarOpen}/>
                { backdrop}   
           </div>
        );
    }
}

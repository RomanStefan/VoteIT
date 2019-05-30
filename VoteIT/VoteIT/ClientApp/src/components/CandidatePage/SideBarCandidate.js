import React, { Component } from 'react';
import './SideBarCandidate.css'

export class SideBarCandidate extends Component {
     constructor(props) {
        super(props);
        };
    

    render() {
        return (
            <nav className="sideBar">
                <ul>
                    <li><a href="/">products</a></li>
                    <li><a href="/">users</a></li>
                </ul>
            </nav>
        );
    }
}
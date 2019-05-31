import React, { Component } from 'react';
import './SideBar.css'

export class SideBar extends Component {
    constructor(props) {
        super(props);
    };


    render() {

        let drawerClasses = 'side-drawer';
        if (this.props.show) {
            drawerClasses = 'side-drawer open'
        }
        return (
            <nav className={drawerClasses}>
                <ul>
                    <li><a href="/">products</a></li>
                    <li><a href="/">users</a></li>
                    <li><a href="/">Logout</a></li>
                </ul>
            </nav>
        );
    }
}
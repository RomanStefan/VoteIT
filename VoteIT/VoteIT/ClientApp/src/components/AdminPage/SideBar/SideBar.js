import React, { Component } from 'react';
import './SideBar.css'

export class SideBar extends Component {
    constructor(props) {
        super(props);
        this.Logout = this.Logout.bind(this);
    };


    Logout() {
        localStorage.removeItem('user');
    }

    render() {

        let drawerClasses = 'side-drawer';
        if (this.props.show) {
            drawerClasses = 'side-drawer open'
        }
        return (
            <nav className={drawerClasses}>
                <ul>
                    <li><a href="/">Start Sesion</a></li>
                    <li><a href="/" onClick={this.Logout}>Logout</a></li>
                </ul>
            </nav>
        );
    }
}
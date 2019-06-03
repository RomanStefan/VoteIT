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

        let drawerClasses = 'sidedrawer';
        if (this.props.show) {
            drawerClasses = 'sidedrawer open'
        }
        return (
            <nav className={drawerClasses}>
                <ul>
                    <li><a class = "link" href="/voters/local">Local Elections</a></li>
                    <li><a class="link" href="/voters/presidential">Presidential Elections</a></li>
                    <li><a class="link" href="/" onClick={this.Logout}>Logout</a></li>
                </ul>
            </nav>
        );
    }
}
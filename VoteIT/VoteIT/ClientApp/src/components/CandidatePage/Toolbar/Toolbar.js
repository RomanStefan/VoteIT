import React, { Component } from 'react';
import './Toolbar.css';
import { DrawerToggleButton } from '../SideBar/DrawerToggleButton.js';

export class Toolbar extends Component {
    static displayName = Toolbar.name;

    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            menuOpen: false

        };
        this.Logout = this.Logout.bind(this);
    }

    Logout() {
        localStorage.removeItem('user');
    }

    render() {
        return (
            <header className="toolbar">
                <nav className="toolbar_navigation">
                    <div className="toolbar_toggle_button">
                        <DrawerToggleButton click={this.props.drawerClickHandler} />
                    </div>
                    <div className="toolbar_logo"><a href="/candidate">VoteIT</a></div>
                    <div className="spacer"></div>
                    <div className="toolbar_navigation_items">
                        <ul>
                            <li><a href="/candidates/editProfile">Register candidature</a></li>
                            <li><a href="/" onClick={this.Logout}>Logout</a></li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

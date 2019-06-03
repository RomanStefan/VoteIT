import React, { Component } from 'react';
import './ToolbarVoter.css';
import { DrawerToggleButton } from '../SideBar/DrawerToggleButton.js';

export class ToolbarVoter extends Component {
    static displayName = ToolbarVoter.name;

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
            <header className="toolbarVoter">
                <nav className="toolbar_navigation">
                    <div className="toolbar_toggle_button">
                        <DrawerToggleButton click={this.props.drawerClickHandler} />
                    </div>
                    <div className="toolbar_logo"><a href="/voter">The Logo</a></div>
                    <div className="spacer"></div>
                    <div className="toolbar_navigation_items">
                        <ul>
                            <li><a href="/voters/local">Local Elections</a></li>
                            <li><a href="/voters/presidential">Presidential Elections</a></li>
                            <li><a href="/" onClick={this.Logout}>Logout</a></li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

import React, { Component } from 'react';
import { Collapse, Button, Container, NavbarBrand, NavbarToggler, NavLink } from 'reactstrap';
import './NavMenuCandidate.css';
import { slide as Menu } from 'react-burger-menu'
import sidebarLogo from 'D:/VoteIT/VoteIT/VoteIT/ClientApp/src/resources/menu.png';
import { DrawerToggleButton } from './DrawerToggleButton';

export class NavMenuCandidate extends Component {
    static displayName = NavMenuCandidate.name;

    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            menuOpen: false

        };
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.Logout = this.Logout.bind(this);
        this.showSettings = this.showSettings.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    showSettings(event){
        event.preventDefault();
        console.log('test');
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    Logout() {
        localStorage.removeItem('user');
    }

    handleStateChange(state) {
        this.setState({ menuOpen: state.isOpen })
    }

   
    closeMenu() {
        this.setState({ menuOpen: false })
    }

    toggleMenu() {
        this.setState(state => ({ menuOpen: !state.menuOpen }))
    }

    toggleSidebar() {
        document.getElementById("sidebar").classList.toggle('active');
    }

    render() {
        return (
            <header className="toolbar">
                <nav className="toolbar_navigation">
                    <div>
                        <DrawerToggleButton click={this.props.drawerClickHandler}/>
                    </div>
                    <div className="toolbar_logo"><a href="/">The Logo</a></div>
                    <div className="spacer"></div>
                    <div className="toolbar_navigation_items">
                        <ul>
                            <li><a href="/">Products</a></li>
                            <li><a href="/">Users</a></li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

import React, { Component } from 'react';
import { Collapse, Button, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenuCandidate.css';
import { slide as Menu } from 'react-burger-menu'
import sidebarLogo from 'D:/VoteIT/VoteIT/VoteIT/ClientApp/src/resources/menu.png';

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
            <div className="container-fluid">
                <nav className="navbar navbar-expand-xl navbar-light">
                    <div className="row row-header">
                        <div id="sidebar">
                            <div class="toggle-btn" onClick={this.toggleSidebar}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <ul>
                                <li><a href="/candidates/editProfile">Register for new sesions</a></li>
                                <li>APARTMENTS</li>
                                <li>About</li>
                            </ul>
                        </div>
                        <div className="col-4">
                          <a href="#">Test 1</a>
                        </div>
                        <div className="col-4">
                            <a href="#">Test 2</a>
                        </div>
                        <div className="col-4">
                            <a href="/" onClick={this.Logout}>Logout</a>
                        </div>
                    </div>
                </nav>
                </div>
        );
    }
}

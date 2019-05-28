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


    render() {
        return (
            <div className="container-fluid">
                <nav className="navbar navbar-expand-xl navbar-light">
                    <div className="row row-header">
                        <div className="col-2">
                            <Menu width= {'300px'}
                            isOpen={false}>
                                <a id="home" className="menu-item" href="/">Home</a>
                                <a id="about" className="menu-item" href="/about">About</a>
                                <a id="contact" className="menu-item" href="/contact">Contact</a>
                            </Menu>
                            <button type="button" className="btn button-sidebar" onClick={this.openSideBar}>
                                <img src={sidebarLogo} alt="Menu" className="menu-icon" />
                            </button>
                        </div>
                        <div className="col-3">
                          <a href="#">Test 1</a>
                        </div>
                        <div className="col-3">
                            <a href="#">Test 2</a>
                        </div>
                        <div className="col-3">
                            <a href="#">Logout</a>
                        </div>
                    </div>
                </nav>
                </div>
        );
    }
}

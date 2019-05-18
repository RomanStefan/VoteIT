import React, { Component } from 'react';
import './LoginPage.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { NavMenu } from './../NavMenu';
import logo from 'D:/VoteIT/VoteIT/VoteIT/ClientApp/src/resources/login.png';

export class Login extends Component {
    constructor(props) {
        super(props);
        var user = JSON.parse(localStorage.getItem('user'));
        let userType = null;
        if (user && user.userType ) {
            userType = user.userType;
        }
        this.state = {
            username: '',
            password: '',
            userType: userType
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.loginClick = this.loginClick.bind(this);
    }

    handleUsernameChange(evt) {
        this.setState({ username: evt.target.value });
        console.log(evt.target.value);
    }

    handlePasswordChange(evt) {
        this.setState({ password: evt.target.value });
        console.log(evt.target.value);
    }

    loginClick() {
        const { username, password } = this.state;

        axios.post('https://localhost:44319/Users/GetUserByUsernameAndPassword', {
            username,
            password
        }).then(res => {
            localStorage.setItem('user', JSON.stringify(res.data));
            this.setState({ userType: res.data.userType });
            /*var user = JSON.parse(localStorage.getItem('user'));
            if (user.userType === 1) {
                this.props.history.push('/voter');
                console.log("A intrat pe cazul Voter!");
            }
            else if (user.userType === 2) {
                this.props.history.push('/candidate');
            }
            else
                this.props.history.push('/admin'); */
            }); 

    } 

    render() {
        console.log(this.state.userType);
        switch (this.state.userType) {
            case 1:
                return <Redirect to='/voter' />;
                console.log("A intrat pe cazul Voter!");
                break;
            case 2:
                return <Redirect to='/candidate' />;
                break;
            default:
                return (
                    <div>
                        <NavMenu />
                        <form>
                            <div className="imgcontainer">
                                <img src={logo} alt="Avatar" className="avatar" />
                            </div>

                            <div className="container">
                                <label><b>Username</b></label>
                                <input type="text" placeholder="Enter Username" name="uname" required onChange={this.handleUsernameChange} />

                                <label><b>Password</b></label>
                                <input type="password" placeholder="Enter Password" name="psw" required onChange={this.handlePasswordChange} />

                                <button type="submit" onClick={this.loginClick}>Login</button>
                            </div>
                        </form>
                    </div>
                );

        }

    }
}

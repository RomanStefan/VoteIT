import React, { Component } from 'react';
import './LoginPage.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            user: ''
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
        console.log("S-a apasat butonul din login");
        const { username, password } = this.state;

        axios.post('https://localhost:44319/Users/GetUserByUsernameAndPassword', {
            username,
            password
        }).then(res => {
            const user = res.data;
            this.setState({ user: res.data });
            //localStorage.setItem('user', res.data);
            if (this.state.user.userType === 1) {
                this.props.history.push('/voter');
                console.log("A intrat pe cazul Voter!");
            }
            else if (this.state.user.userType === 2)
                this.props.history.push('/candidate');
            else
                this.props.history.push('/admin'); 
            });
    } 

    render() {
        /*console.log(this.state.user.userType);
        console.log(typeof this.state.user.userType);

        switch (this.state.user.userType) {
            case 1:
                return (<Redirect to='/voter' />);
                console.log("A intrat pe cazul Voter!");
                break;
            case 2:
                return (<Redirect to='/candidate' />);
            case 0:
                return (<Redirect to='/admin' />);
                break;   
        } */
        return (
            <form>
                <div className="imgcontainer">
                    <img src="D:/VoteIT/VoteIT/VoteIT/ClientApp/src/resources/login.png" alt="Avatar" className="avatar"/>
                </div>

                <div className="container">
                    <label><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" required onChange={this.handleUsernameChange}/>

                    <label><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required onChange={this.handlePasswordChange}/>

                    <button type="submit" onClick={this.loginClick}>Login</button>
                </div>
            </form>
        );
    }
}

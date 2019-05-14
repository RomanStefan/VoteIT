import React, { Component } from 'react';
import './LoginPage.css';
import axios from 'axios';
export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
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
            console.log(res);
        }); 
    }


    render() {
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

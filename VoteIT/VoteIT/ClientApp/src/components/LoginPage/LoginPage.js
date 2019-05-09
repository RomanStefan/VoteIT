import React, { Component } from 'react';
import './LoginPage.css';
export class Login extends Component {

    render() {
        return (

            <form>
                <div class="imgcontainer">
                    <img src="D:/VoteIT/VoteIT/VoteIT/ClientApp/src/resources/login.png" alt="Avatar" class="avatar"/>
                </div>

                <div class="container">
                    <label for="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" required/>

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required/>

                    <button type="submit">Login</button>
                </div>
            </form>
        );
    }
}

import React, { Component } from 'react';

export class VotersLabel extends Component {
    render() {
        return (
            <div>
                <h2>Voters Registration</h2>
                <label>Username</label>
                <input type="Text" name="username" placeholder="username" />

                <label>Password</label>
                <input type="password" name="password" placeholder="password" />

            </div>
    );
  }
}
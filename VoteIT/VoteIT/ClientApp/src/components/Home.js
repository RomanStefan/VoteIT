import React, { Component } from 'react';
import './Home.css';
import { VotersLabel } from './VotersLabel.js'

export class Home extends Component {
    static displayName = Home.name;

  render () {
      return (
          <div id="Register_Label">
              <h2>Register</h2>
              <div id="buttons_container">
                  <button class="btn" id="voter">Voter</button>
                  <button class="btn" id="candidate">Candidate</button>
              </div>

              <VotersLabel/>
          </div>

    );
  }
}

import React, { Component } from 'react';
import './Home.css';
import { RegistrationLabel } from './RegistrationLabel.js'

export class Home extends Component {
    static displayName = Home.name;

  render () {
      return (
          <div id="Register_Label">
              <RegistrationLabel/>
          </div>
    );
  }
}

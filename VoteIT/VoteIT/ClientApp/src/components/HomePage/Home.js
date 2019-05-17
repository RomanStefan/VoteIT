import React, { Component } from 'react';
import './Home.css';
import { RegistrationLabel } from './RegistrationLabel.js'
import { NavMenu } from './../NavMenu';

export class Home extends Component {
    static displayName = Home.name;

  render () {
      return (
          <div id="Register_Label">
              <NavMenu />
              <RegistrationLabel/>
          </div>
    );
  }
}

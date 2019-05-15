import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/HomePage/Home';
import { Login } from './components/LoginPage/LoginPage'
import { Voter } from './components/VoterPage/VoterPage'
import { Candidate } from './components/CandidatePage/CandidatePage'
import { Admin } from './components/AdminPage/AdminPage'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/voter' component={Voter} />
        <Route path='/candidate' component={Candidate} />
        <Route path='/admin' component={Admin} />
      </Layout>
    );
  }
}

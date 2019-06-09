import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/HomePage/Home';
import { Login } from './components/LoginPage/LoginPage'
import { Voter } from './components/VoterPage/VoterPage'
import { Presidential } from './components/VoterPage/PresidentialElections'
import { Local } from './components/VoterPage/LocalElections'
import { Candidate } from './components/CandidatePage/CandidatePage'
import { EditCandidatePage } from './components/CandidatePage/EditCandidatePage'
import { Admin } from './components/AdminPage/AdminPage'
import { CreateSession } from './components/AdminPage/CreateSession'
import { StartSession } from './components/AdminPage/StartSession'
import { EndSession } from './components/AdminPage/EndSession'



export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/voters/presidential' component={Presidential} />
        <Route path='/voters/local' component={Local} />
        <Route path='/voter' component={Voter} />
        <Route path='/candidate' component={Candidate} />
        <Route path='/candidates/editProfile' component={EditCandidatePage}/>
        <Route path='/admin' component={Admin} />
        <Route path='/admins/createsession' component={CreateSession}/>
        <Route path='/admins/startsession' component={StartSession} />
        <Route path='/admins/endsession' component={EndSession} />
      </Layout>
    );
  }
}

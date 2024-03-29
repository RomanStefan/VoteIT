﻿import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import classnames from 'classnames';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RegistrationLabel.css';
import axios from 'axios';
import zxcvbn from 'zxcvbn';
//https://reactstrap.github.io/components/tabs/       <<<LOOK HERE
export class RegistrationLabel extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            Voters
                </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Candidates
                </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <Voters />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <Candidates />
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

export class Voters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            selectedImage: null,
            suggestions:[],
            buffer: []
        };



        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);

        this.registerClick = this.registerClick.bind(this);
    }

    handleUsernameChange(evt) {
        this.setState({ username: evt.target.value });
        console.log(evt.target.value);
    }

    handlePasswordChange(evt) {
        const password = evt.target.value;
        const evaluation = zxcvbn(password, [this.state.username]);
        this.setState({
            password: evt.target.value,
            score: evaluation.score,
            suggestions: evaluation.feedback.suggestions
        });
        console.log(evaluation);
    }

    handleImageChange(evt) {
        this.setState({ selectedImage: URL.createObjectURL(evt.target.files[0]) });
        console.log("SelectedImage:{0}", evt.target.files[0]);

        let reader = new FileReader();
        reader.readAsDataURL(evt.target.files[0]);

        let self = this;
        reader.onload = function () {
            self.setState({ buffer: reader.result });
        };

        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    registerClick() {
        console.log("S-a apasat butonul din Voter");

        const { username, password, selectedImage, buffer } = this.state;
        console.log(buffer);

        axios.post('https://localhost:44319/Users/PostVoterUser', {
            username,
            password,
            buffer
        }).then(res => {
            console.log(res);  
        });
        toast.success('Successful created!', {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 1500
        });
    }

    render() {
        const { score, suggestions } = this.state;
        return (
            <form>
                <h2>Voters Registration</h2>
                <div className="form-group">
                    <label>Username</label>
                    <input type="username" className="form-control" id="username" onChange={this.handleUsernameChange}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" id="pwd" onChange={this.handlePasswordChange} />
                    <p>Password score: {score} (4 is the maximum)</p>
                    <ul>
                        {suggestions.map((s, index) =>
                            <li key={index}>{s}</li>
                        )}
                    </ul>
                </div>
                <div className="form-group">
                    <label>Identity Card Photo</label>
                    <input type="file" className="form-control" id="fileLoad" onChange={this.handleImageChange} />
                    <img id="selectedImage" src={this.state.selectedImage} />
                </div>
                
                <button className="button_register" type="submit" onClick={this.registerClick}>Register</button>
                <ToastContainer/>
            </form>
        );
    }
}

export class Candidates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            userName: '',
            password: '',
            personalDescription: '',
            suggestions: [],
            politicalParty: 'PSD'
        };



        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePersonalDescriptionChange = this.handlePersonalDescriptionChange.bind(this);
        this.handlePoliticalPartyChange = this.handlePoliticalPartyChange.bind(this);

        this.registerClick = this.registerClick.bind(this);
    }

    handleFirstNameChange(evt) {
        this.setState({ firstName: evt.target.value });
        console.log(evt.target.value);
    }

    handleLastNameChange(evt) {
        this.setState({ lastName: evt.target.value });
        console.log(evt.target.value);
    }

    handleUserNameChange(evt) {
        this.setState({ userName: evt.target.value });
        console.log(evt.target.value);
    }

    handlePasswordChange(evt) {
        const password = evt.target.value;
        const evaluation = zxcvbn(password, [this.state.username]);
        this.setState({
            password: evt.target.value,
            score: evaluation.score,
            suggestions: evaluation.feedback.suggestions
        });
        console.log(evaluation);
    }

    handlePersonalDescriptionChange(evt) {
        this.setState({ personalDescription: evt.target.value });
        console.log(evt.target.value);
    }

    handlePoliticalPartyChange(evt) {
        this.setState({ politicalParty: evt.target.value });
        console.log(evt.target.value);
    }

    registerClick() {
        console.log("S-a apasat butonul din Candidate");

        const { firstName, lastName, userName, password, personalDescription, politicalParty } = this.state;

        axios.post('https://localhost:44319/Users/PostCandidateUser', {
            firstName,
            lastName,
            userName,
            password,
            personalDescription,
            politicalParty
        }).then(res => {
            console.log(res);
            toast.success('Successful created!', {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1500
            });
        }); 
    }

    render() {
        const { score, suggestions } = this.state;
        return (
            <form>
                <h2>Candidates Registration</h2>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" id="firstName" onChange={this.handleFirstNameChange} />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" id="lastName" onChange={this.handleLastNameChange} />
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="username" className="form-control" id="username" onChange={this.handleUserNameChange} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" id="pwd" onChange={this.handlePasswordChange} />
                    <p>Password score: {score} (4 is the maximum)</p>
                    <ul>
                        {suggestions.map((s, index) =>
                            <li key={index}>{s}</li>
                        )}
                    </ul>
                </div>
                <div className="form-group">
                    <label>Personal Description</label>
                    <input type="text" className="form-control" id="persDescription" onChange={this.handlePersonalDescriptionChange} />
                </div>
                <FormGroup>
                    <Label for="SelectParty">Political Party</Label>
                    <Input type="select" name="select" id="party" onChange={this.handlePoliticalPartyChange} >
                        <option>PSD</option>
                        <option>PNL</option>
                        <option>USR</option>
                    </Input>
                </FormGroup>


                <button className="button_register" type="submit" onClick={this.registerClick}>Register</button>
                <ToastContainer/>
            </form>
        )
    };
}

import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, FormGroup, FormControl, Label, Input } from 'reactstrap';
import classnames from 'classnames';
import './RegistrationLabel.css';
import axios from 'axios';
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
            selectedImage: null
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
        this.setState({ password: evt.target.value });
        console.log(evt.target.value);
    }

    handleImageChange(evt) {
        this.setState({ selectedImage: evt.target.files[0] });
        console.log(evt.target.files[0]);
    }


    registerClick() {
        console.log("S-a apasat butonul din Voter");
        /*var formData = new FormData();
        formData.append("username", this.state.username);
        formData.append("password", this.state.password); 
        formData.append("selectedImage", this.state.selectedImage); */
        const { username, password, selectedImage } = this.state;
        axios.post('https://localhost:44319/Voters', {
            username,
            password,
            selectedImage
        }).then(res => {
            console.log(res);
        });

    }

    render() {
        return (
            <form>
                <h2>Voters Registration</h2>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="username" className="form-control" id="username" onChange={this.handleUsernameChange}/>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control" id="pwd" onChange={this.handlePasswordChange}/>
                </div>
                <div className="form-group">
                    <label>Identity Card Photo:</label>
                    <input type="file" className="form-control" id="fileLoad" onChange={this.handleImageChange}/>
                </div>


                <button type="submit" className="btn btn-default" onClick={this.registerClick}>Register</button>
            </form>
        );
    }
}

export class Candidates extends Component {
    render() {
        return (
            <form>
                <h2>Candidates Registration</h2>
                <div className="form-group">
                    <label>First Name:</label>
                    <input type="text" className="form-control" id="firstName" />
                </div>
                <div className="form-group">
                    <label>last Name:</label>
                    <input type="text" className="form-control" id="lastName" />
                </div>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="username" className="form-control" id="username" />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control" id="pwd" />
                </div>
                <div className="form-group">
                    <label>Personal Description:</label>
                    <input type="text" className="form-control" id="persDescription" />
                </div>
                <FormGroup>
                    <Label for="SelectParty">Political Party</Label>
                    <Input type="select" name="select" id="party">
                        <option>PSD</option>
                        <option>PNL</option>
                        <option>USR</option>
                    </Input>
                </FormGroup>


                <button type="submit" className="btn btn-default">Register</button>
            </form>
        )
    };
}

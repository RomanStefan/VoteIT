import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import { Candidate } from './CandidatePage';

export class EditCandidatePage extends Component {
    constructor(props) {
        var user = JSON.parse(localStorage.getItem('user'));
        super(props);
        this.state = {
            personalDescription: user.personalDescription,
            politicalParty: user.politicalParty,
            candidatureType: 'Local Elections',
        };



        this.handlePersonalDescriptionChange = this.handlePersonalDescriptionChange.bind(this);
        this.handlePoliticalPartyChange = this.handlePoliticalPartyChange.bind(this);
        this.handleCandidatureTypeChange = this.handleCandidatureTypeChange.bind(this);

        this.SaveChangesClick = this.SaveChangesClick.bind(this);
    }

    handlePersonalDescriptionChange(evt) {
        this.setState({ personalDescription: evt.target.value });
        console.log(evt.target.value);
    }

    handlePoliticalPartyChange(evt) {
        this.setState({ politicalParty: evt.target.value });
        console.log(evt.target.value);
    }

    handleCandidatureTypeChange(evt) {
        this.setState({ candidatureType: evt.target.value });
        console.log(evt.target.value);
    }

    SaveChangesClick() {
        var user = JSON.parse(localStorage.getItem('user'));
        const { personalDescription, politicalParty, candidatureType } = this.state;
        const candidateId = user.id;
        var sesionId;
        switch (candidatureType) {
            case 'Local Elections':
                sesionId = 1;
                break;
            case 'Presidential Elections':
                sesionId = 2;
                break;
            default:
            // code block
        }
        console.log(sesionId);
        axios.put('https://localhost:44319/Users/UpdateCandidateProfile', {
            candidateId,
            personalDescription,
            politicalParty,
            sesionId
        }).then(res => {
            console.log(res);
            });
    }

    render() {
        var user = JSON.parse(localStorage.getItem('user'));
        const personalDescription = user.personalDescription;
        const politicalParty = user.politicalParty
        return (
            <div>
                <Candidate/>
                <form>
                    <h2 class="headertekst">Register candidature</h2>
                    <div className="form-group">
                        <label>Personal Description:</label>
                        <input type="text" className="form-control" id="persDescription" placeholder={personalDescription} onChange={this.handlePersonalDescriptionChange}/>
                    </div>
                    <FormGroup>
                        <Label for="SelectParty">Political Party</Label>
                        <Input type="select" name="select" id="party" placeholder={politicalParty} onChange={this.handlePoliticalPartyChange} >
                            <option>PSD</option>
                            <option>PNL</option>
                            <option>USR</option>
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="SelectCandidature">Choose type of candidature</Label>
                        <Input type="select" name="select" id="party" onChange={this.handleCandidatureTypeChange} >
                            <option>Local Elections</option>
                            <option>Presidential Elections</option>
                        </Input>
                    </FormGroup>

                    <form action="/candidate" > 
                        <button className="SaveButton" type="submit" onClick={this.SaveChangesClick}>Save Profile</button>
                    </form> 
                </form>
            </div>
        );
    }
}
import React, { Component } from 'react';
import { TabPane, Nav, NavLink, Row, Col, FormGroup, Label, Input, Form } from 'reactstrap';
import PieChart from 'react-minimal-pie-chart';
import axios from 'axios';
import './ChartPie.css';

export class ChartPie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voteResults: [],
            candidates: [],
            percentages: []
        };


        axios.get('https://localhost:44319/VotingHistory/GetTheResults').then(res => {
            this.setState({ voteResults: res.data });
            var candidates = [];
            for (var i = 0; i < res.data.length; i++) {

                var candidate = {
                    title: "",
                    value: 0,
                    color: ""
                };
                candidate.title = res.data[i].candidateName;
                candidate.value = res.data[i].numberOfVotes;

                switch (res.data[i].politicalParty) {
                    case 'PSD':
                        candidate.color = "#ff4000";
                        break;
                    case 'PNL':
                        candidate.color = "#ffdb4d";
                        break;
                    case 'USR':
                        candidate.color = "#00ffff";
                        break;
                }
                candidates.push(candidate)
            }
            this.setState({ candidates: candidates });

            //calculam numarul total de voturi
            var totalVotes = 0; 
            for (var i = 0; i < res.data.length; i++) {
                totalVotes += res.data[i].numberOfVotes;
            }

            var percentages = [];
            for (var i = 0; i < res.data.length; i++) {

                var percentage = {
                    candidateName: "",
                    value: 0,
                    politicalParty: "",
                    color: ""
                };
                percentage.candidateName = res.data[i].candidateName;
                percentage.value = ((100 * res.data[i].numberOfVotes) / totalVotes).toFixed(2);
                percentage.politicalParty = res.data[i].politicalParty;

                switch (res.data[i].politicalParty) {
                    case 'PSD':
                        percentage.color = "#ff4000";
                        break;
                    case 'PNL':
                        percentage.color = "#ffdb4d";
                        break;
                    case 'USR':
                        percentage.color = "#00ffff";
                        break;
                }
                percentages.push(percentage);
            }
            this.setState({ percentages: percentages });
            console.log(percentages);
        });
    }

    displayPercentages(){
        return this.state.percentages.map((percentage, index) => {
            const { candidateName, value, color, politicalParty } = percentage //destructuring
            return (
                <div>
                    <p>{candidateName} - <font color={color}><b>{politicalParty}</b></font>  - <b>{value}</b>%</p>
                </div>
               )
        });
}


    render() {
        return (
            <div id="chartContainer">
                    <p>The results are: </p>        
                <div id = "row">
                    <PieChart className="chart"
                        data={
                            this.state.candidates
                        }
                    />
                </div>               
                <div id= "rowResults">
                    {this.displayPercentages()}
                </div>               
            </div>
        );
    }
}

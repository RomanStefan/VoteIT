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
            candidates: []
        };


        axios.get('https://localhost:44319/VotingHistory/GetTheResults').then(res => {
            this.setState({ voteResults: res.data });
            console.log(res.data);
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
                        candidate.color = "#ffff00";
                        break;
                    case 'USR':
                        candidate.color = "#00ffff";
                        break;
                }
                candidates.push(candidate)
            }
            this.setState({ candidates: candidates });
            console.log(candidates);
        });
    }

    render() {
        return (
            <div>
                <PieChart className="chart"
                    data={
                        this.state.candidates
                    }
                />
            </div>
        );
    }
}

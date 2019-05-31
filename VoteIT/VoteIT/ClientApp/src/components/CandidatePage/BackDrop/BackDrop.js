import React, { Component } from 'react';
import './BackDrop.css'

export class BackDrop extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="backdrop" onClick={this.props.click} />
        );
    }
}
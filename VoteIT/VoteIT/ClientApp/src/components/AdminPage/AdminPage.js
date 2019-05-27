import React, { Component } from 'react';
import axios from 'axios';
import { NavMenuAdmin } from './NavMenuAdmin';
export class Admin extends Component {
    render() {
        return (
            <div>
                <NavMenuAdmin />
                <h2>Admin Page</h2>
            </div>
        );
    }
}

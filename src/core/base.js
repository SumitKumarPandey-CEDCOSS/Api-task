import React, {Component} from 'react';

import { requests, globalState } from '../services';
import {environment} from '../environments/environment';

class Base extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showToast: false,
            error: false,
            message: 'Success'
        };
    }
    // can we access bby extended class using this.{variable name}
    globalState = globalState;
    requests = requests;
    environment = environment;

    // to call this render in extended class use super.render()
    render() {
        return (
            <React.Fragment>
            </React.Fragment>
        );
    }
}

export default Base;
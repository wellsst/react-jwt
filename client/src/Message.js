import React, {Component} from 'react';
import SimpleReactValidator from 'simple-react-validator';
import API, {httpPost, postWithAuth} from "./API";
import {Alert, Button, Form, FormGroup, Input, Label} from "reactstrap";
import {AuthService} from "./auth.service";

class Message extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let type =  'success';
        if (this.props.type) {
            type = this.props.type;
        }
        if (this.props.message) {
            return <Alert color="{type}">
                {this.props.message}
            </Alert>
        }
        return ""
    }
}

export default Message;
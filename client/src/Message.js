import React, {Component} from 'react';
import {Alert} from "reactstrap";

class Message extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.message) {
            let type = 'success';
            if (this.props.type) {
                type = this.props.type;
            }
            return <Alert color="{type}">
                {this.props.message}
            </Alert>
        }
        return ""
    }
}

export default Message;
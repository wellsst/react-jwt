import React, {Component} from 'react';
import SimpleReactValidator from 'simple-react-validator';
import {postWithAuth} from "./API";
import {Alert, Button, Form, FormGroup, Input, Label} from "reactstrap";
import Message from "./Message";

class SecureAxiosTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: "",
            serverMessage: "",
            isSubmitting: false,
            serverError: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validator = new SimpleReactValidator();
    }

    successHandler(response) {
        console.log(response)
        this.setState({serverMessage: response.data.message})

    }

    async handleSubmit(e) {
        e.preventDefault();
        if (this.validator.allValid()) {
            postWithAuth('testSecurePost',
                {data: this.state.data},
                this.successHandler.bind(this));
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value,
        });
    };

    render() {
        return <Form>
            <FormGroup>
                <Label for="data">Enter the challengeId to finish registration</Label>
                <Input type="text" name="data" id="data" placeholder="Type something to send to the server with JWT auth"
                       value={this.state.data}
                       onChange={this.handleChange} autoFocus/>
                <Message message={this.validator.message('data', this.state.data, 'required|max:200')} type='danger'/>
            </FormGroup>

            <Message message={this.state.serverMessage}/>
            <Message message={this.state.serverError} type='danger'/>

            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                Test server response
            </Button>
        </Form>
    }
}

export default SecureAxiosTest;
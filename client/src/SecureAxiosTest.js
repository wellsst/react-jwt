import React, {Component} from 'react';
import SimpleReactValidator from 'simple-react-validator';
import API, {httpPost, securePost} from "./API";
import {Alert, Button, Form, FormGroup, Input, Label} from "reactstrap";
import {AuthService} from "./auth.service";

class SecureAxiosTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            requestId: "",
            challengeId: "",
            isSubmitting: false,
            serverError: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validator = new SimpleReactValidator();
    }

    successHandler(d) {
        console.log(d)
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (this.validator.allValid()) {
            let api = new API()
            securePost('testSecurePost',
                {data: this.state.data},
                this.successHandler);
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
                <Input type="text" name="data" id="data" placeholder="Type sometihng"
                       value={this.state.data}
                       onChange={this.handleChange} autoFocus/>
                <small id="emailHelp" className="form-text text-muted">
                    Enter the challengeId provided
                </small>
                {this.validator.message('data', this.state.data, 'required')}
            </FormGroup>

            <Alert color="danger">
                TODO: Make me a component: {this.state.serverError}
            </Alert>

            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                Test it
            </Button>
        </Form>
    }
}

export default SecureAxiosTest;
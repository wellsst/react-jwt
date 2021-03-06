import React, {Component} from 'react';
import SimpleReactValidator from 'simple-react-validator';
import {post} from "./API";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import Message from "./Message";
import {Link} from "react-router-dom";

class RegisterStartForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            isSubmitting: false,
            emailSubmitted: false,
            serverError: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validator = new SimpleReactValidator();

    }

    successHandler(response) {
        // Success 🎉
        console.log(response);
        this.setState({
            emailSubmitted: true,
            challengeId: response.data.challengeId,
            cleanupOlderThan: response.data.cleanupOlderThan
        });
        /*return <Redirect to='/registerSubmitted' />*/
        const {match: {params}, history} = this.props;
        history.push({
            pathname: '/registerSubmitted',
            // search: '?query=abc',
            state: {
                email: this.state.email,
                emailSubmitted: true,
                challengeId: response.data.challengeId,
                cleanupOlderThan: response.data.cleanupOlderThan
            }
        })
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (this.validator.allValid()) {
            post('registerRequest',
                {emailAddress: this.state.email},
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
                <Label for="email">Email address</Label>
                <Input type="email" name="email" id="email" placeholder="Enter email" value={this.state.email}
                       onChange={this.handleChange} autoFocus/>
                <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                </small>
                {this.validator.message('email', this.state.email, 'required|email')}
            </FormGroup>

            <Message message={this.state.serverMessage}/>
            <Message message={this.state.serverError} type='danger'/>

            <Button variant="primary" type="button" class="btn btn-primary" onClick={this.handleSubmit}>
                Register
            </Button>
            <Link type="button" class="btn btn-secondary" to="/">Start again</Link>
        </Form>
    }
}

export default RegisterStartForm;
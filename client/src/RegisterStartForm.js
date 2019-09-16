import React, {Component} from 'react';
import SimpleReactValidator from 'simple-react-validator';
import API from "./API";
import { Button, Form, FormGroup, Input, Label} from "reactstrap";
import Message from "./Message";

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

    async handleSubmit(e) {
        e.preventDefault();
        if (this.validator.allValid()) {
            await API.post(
                'registerRequest',
                {emailAddress: this.state.email}
            ).then((response) => {
                // Success 🎉
                console.log(response);
                this.setState({
                    emailSubmitted: true,
                    challengeId: response.data.challengeId,
                    cleanupOlderThan: response.data.cleanupOlderThan
                });
                /*return <Redirect to='/registerSubmitted' />*/
                const { match: { params }, history } = this.props;
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

            }).catch((error) => {
                // Error 😨
                if (error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    this.setState({serverError: error.response.data});
                } else if (error.request) {
                    /*
                     * The request was made but no response was received, `error.request`
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                    console.log(error.request);
                    this.setState({serverError: "The server seems unreachable, try again later"});
                } else {
                    // Something happened in setting up the request and triggered an Error
                    console.log('Error', error.message);
                    this.setState({serverError: "Issue sending request"});
                }
                console.log(error.config);
            });
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

            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                Register
            </Button>
        </Form>
    }
}

export default RegisterStartForm;
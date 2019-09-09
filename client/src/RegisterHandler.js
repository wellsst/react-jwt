import React, {Component} from 'react';
import RegisterEmailSubmitted from "./RegisterEmailSubmitted";
import SimpleReactValidator from 'simple-react-validator';
import API from "./API";
import {Alert, Button, Form, FormGroup, Input, Label} from "reactstrap";

class RegisterHandler extends Component {

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
                    cleanupOlderThan: response.data.cleanupOlderThan });
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
        if (this.state.emailSubmitted) {
            return <RegisterEmailSubmitted email={this.state.email} challengeId={this.state.challengeId} cleanupOlderThan={this.state.cleanupOlderThan}/>
        } else {
            return <Form>
                <FormGroup>
                    <Label for="exampleEmail">Email address</Label>
                    <Input type="email" name="email" id="email" placeholder="Enter email" value={this.state.email}
                           onChange={this.handleChange} autoFocus/>
                    <small id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else.
                    </small>
                    {this.validator.message('email', this.state.email, 'required|email')}
                </FormGroup>


                    <Alert color="danger">
                        TODO: Make me a component: {this.state.serverError}
                    </Alert>

                <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                    Register
                </Button>
            </Form>

            /*render={({
                         values,
                         errors,
                         status,
                         touched,
                         handleBlur,
                         handleChange,
                         handleSubmit,
                         isSubmitting,
                     }) => (
                <Form class="form-inline" onSubmit={this.handleSubmit}>
                    <div className="form-group mb-2">
                        <Field type="email" name="email" class="form-control sr-only-focusable"
                               placeholder="name@example.com" onChange={this.handleChange}/>
                        <ErrorMessage name="email" component="div"/>

                        <button type="submit" class="btn btn-primary" disabled={isSubmitting}>
                            Register
                        </button>

                    </div>
                </Form>*/

        }
        /*return [
            content
        ]*/
    }
}

export default RegisterHandler;
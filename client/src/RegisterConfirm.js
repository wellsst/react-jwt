import React, {Component} from 'react';
import SimpleReactValidator from 'simple-react-validator';
import {post} from "./API";
import { Button, Form, FormGroup, Input, Label} from "reactstrap";
import {AuthService} from "./auth.service";
import Message from "./Message";

class RegisterConfirm extends Component {

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

    successHandler(response) {
        // Success 🎉
        console.log(response);
        this.setState({
            emailSubmitted: true,
            challengeId: response.data.challengeId,
            cleanupOlderThan: response.data.cleanupOlderThan
        });

        let jwt = response.data.jwt;
        console.log(jwt);
        let authService = new AuthService();
        authService.login(jwt);

        const { match: { params }, history } = this.props;
        history.push({
            pathname: '/loggedIn'
        })
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (this.validator.allValid()) {
            post('registerAccept',
                {requestId: this.state.requestId, challengeId: this.state.challengeId },
                this.successHandler.bind(this), defaultErrorHandler.bind(this));
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

    componentDidMount() {
        const {match: {params}} = this.props;
        const requestId = params.requestId;
        this.setState({requestId: requestId});
    }

    render() {
        return <Form>
            <FormGroup>
                <Label for="challengeId">Enter the challengeId to finish registration</Label>
                <Input type="number" name="challengeId" id="challengeId" placeholder="ChallengeId"
                       value={this.state.challengeId}
                       onChange={this.handleChange} autoFocus size="10"/>
                <small id="emailHelp" className="form-text text-muted">
                    Enter the challengeId provided
                </small>
                {this.validator.message('challengeId', this.state.challengeId, 'required|numeric|min:4|max:4')}
            </FormGroup>

            <Message message={this.state.serverMessage}/>
            <Message message={this.state.serverError} type='danger'/>

            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                Complete Registration
            </Button>
        </Form>
    }
}

export default RegisterConfirm;
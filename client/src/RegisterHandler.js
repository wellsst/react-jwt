import React, {Component} from 'react';
import RegisterEmailSubmitted from "./RegisterEmailSubmitted";
import SimpleReactValidator from 'simple-react-validator';
import API from "./API";
import RegisterConfirm from "./RegisterConfirm";
import RegisterStartForm from "./RegisterStartForm";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Notfound from "./Notfound";
import LoggedIn from "./LoggedIn";

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
        return <BrowserRouter>
            <div>
                <ul>
                    <li>
                        <Link to="/">Start again</Link>
                    </li>
                    {/*<li>
                        <Link to="/registerSubmitted">registerSubmitted</Link>
                    </li>
                    <li>
                        <Link to="/contact">Dud link</Link>
                    </li>*/}
                </ul>
                <Switch>
                    <Route exact path="/" component={RegisterStartForm} />
                    <Route path="/registerSubmitted" component={RegisterEmailSubmitted} />
                    <Route path="/registerConfirmClient/:requestId" component={RegisterConfirm} />
                    <Route path="/loggedIn" component={LoggedIn} />
                    <Route component={Notfound} />
                </Switch>
            </div>
        </BrowserRouter>
    }
}

export default RegisterHandler;
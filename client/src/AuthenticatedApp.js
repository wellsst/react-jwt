import React, {Component} from 'react';
import AppNav from './AppNav';
import {Row} from 'reactstrap'
import {BrowserRouter, Link} from "react-router-dom";

import grailsLogo from './images/grails-cupsonly-logo-white.svg';
import reactLogo from './images/logo.svg';
import {CLIENT_VERSION, REACT_VERSION, SERVER_URL} from './config';
import 'whatwg-fetch';
import Footer from "./Footer";
import SecureAxiosTest from "./SecureAxiosTest";


import {ApolloProvider} from 'react-apollo'
import {ApolloClient} from 'apollo-client'
import {createHttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {setContext} from 'apollo-link-context';
import SecureApolloTest from "./SecureApolloTest";
import {AuthService} from "./auth.service";
import {postWithAuth} from "./API";
import Logout from "./Logout";

let authService = new AuthService();

const authLink = setContext((_, {headers}) => {
    // get the authentication token from local storage if it exists
    const token = authService.getToken();
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            loginToken: token
        }
    }
});

// todo: move hardcoded url to config
const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_SERVER_URL
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

class AuthenticatedApp extends Component {

    state = {
        serverInfo: {},
        clientInfo: {
            version: CLIENT_VERSION,
            react: REACT_VERSION
        },
        collapse: false
    }

    toggle = () => {
        this.setState({collapse: !!this.state.collapse})
    }

    successHandler(response) {
        // Success 🎉
        console.info("You are logged in on the server: " + response);
    }

    errorHandler(response) {
        // Success 🎉
        console.info(response);

        authService.logout();
        window.location.href = "/notLoggedIn"
       // this.props.history.push('/notLoggedIn')
    }

    componentDidMount() {
        fetch(SERVER_URL + '/application')
            .then(r => r.json())
            .then(json => this.setState({serverInfo: json}))
            .catch(error => console.error('Error connecting to server: ' + error));

        postWithAuth('confirmLoggedIn',
            {emailAddress: ''},
            this.successHandler.bind(this),
            this.errorHandler.bind(this)
        );
    }

    render() {
        const {serverInfo, clientInfo, collapse} = this.state;

        return [
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <AppNav serverInfo={serverInfo} clientInfo={clientInfo} collapse={collapse} toggle={this.toggle}
                            key={0}/>,
                    <div className="grails-logo-container" key={1}>
                        <img className="grails-logo" src={grailsLogo} alt="Grails"/>
                        <span className="plus-logo">+</span>
                        <img className="hero-logo" src={reactLogo} alt="React"/>
                    </div>,

                    <Row key={2}>
                        <div id="content">
                            <section className="row colset-2-its">
                                <h1>JWT Template/Demo</h1>

                                <p>
                                    Welcome...you should only see this if you are logged in, it is guarded by the auth
                                    guard
                                </p>
                                <p>
                                    This is a demo or tutorial of using JSON Web Tokens (JWT) for authentication.
                                    Angular in
                                    the
                                    front end and Grails in the
                                    backend.

                                    The basic steps for the user are:
                                </p>

                                <ol>
                                    {/*<li>Start with the <a routerLink="/register">Register for JWT auth</a></li>*/}
                                    <li>Enter their email address. This will send them a short lived unique URL</li>
                                    <li>User gets the email and click on the link</li>
                                    <li>This will generate their secure JWT which will be sent to their browser and
                                        stored
                                        there
                                    </li>
                                    <li>Each request that needs a JWT the browser must send it to the server</li>
                                    <li>The server will be able to authenticate and authorise based on the JWT given
                                    </li>
                                </ol>


                                <Link to="/welcome">
                                    <span className="label">You will need to have a valid JWT token to see this</span>
                                </Link>
                                <p>Secure Axios Test: <SecureAxiosTest/></p>
                                <p>Secure (almost) Apollo Test: <SecureApolloTest/></p>
                                <Logout/>

                                <div id="controllers" role="navigation">
                                    <h2>Available Controllers:</h2>
                                    <ul>
                                        {serverInfo.controllers ? serverInfo.controllers.map(controller => {
                                            return <li key={controller.name}><a
                                                href={SERVER_URL + controller.logicalPropertyName}>{controller.name}</a>
                                            </li>;
                                        }) : null}
                                    </ul>
                                </div>
                            </section>

                        </div>

                    </Row>,
                    <Footer key={3}/>
                </BrowserRouter>
            </ApolloProvider>
        ];
    }
}

export default AuthenticatedApp;

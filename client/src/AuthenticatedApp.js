import React, {Component} from 'react';
import AppNav from './AppNav';
import {Button, Card, CardText, CardTitle, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from 'reactstrap'
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
import IntroBlurb from "./IntroBlurb";
import classnames from 'classnames';

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
        activeTab: '2',
        collapse: false
    }

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
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

                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({active: this.state.activeTab === '1'})}
                                onClick={() => {
                                    this.toggle('1');
                                }}>
                                Info
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({active: this.state.activeTab === '2'})}
                                onClick={() => {
                                    this.toggle('2');}}>
                                Tests
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <div id="content">
                                <section className="row colset-2-its">
                                    <h1>JWT Template/Demo</h1>

                                    <IntroBlurb/>

                                    <Link to="/welcome">
                                        <span className="label">You will need to have a valid JWT token to see this</span>
                                    </Link>

                                    <Logout/>
                                </section>

                            </div>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="6">
                                    <Card body>
                                        <CardTitle>Secure Axios HTTP Post Server roundtrip</CardTitle>
                                        <CardText><SecureAxiosTest/></CardText>
                                        {/*<Button>Go somewhere</Button>*/}
                                    </Card>
                                </Col>
                                <Col sm="6">
                                    <Card body>
                                        <CardTitle>Secure Apollo GraphQL Server roundtrip</CardTitle>
                                        <CardText><SecureApolloTest/></CardText>
                                    </Card>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>

                    <Row key={2}>


                    </Row>,
                    <Footer key={3}/>
                </BrowserRouter>
            </ApolloProvider>
        ];
    }
}

export default AuthenticatedApp;

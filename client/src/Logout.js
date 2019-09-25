import React, {Component, useEffect} from "react";
import {postWithAuth} from "./API";
import {Button, Form} from "reactstrap";
import {AuthService} from "./auth.service";

class Logout extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    successHandler(response) {
        console.debug(response)
        this.setState({serverMessage: response.data.message})

        let authService = new AuthService();
        authService.logout();
        this.goHome()
    }

    goHome() {
        window.location.href = "/";
    }

    async handleSubmit(e) {
        e.preventDefault();
        postWithAuth('logout',
            {data: ""},
            this.successHandler.bind(this));
    }

    render() {
        return <Form>
            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                Logout
            </Button>
        </Form>
    }
}

export default Logout
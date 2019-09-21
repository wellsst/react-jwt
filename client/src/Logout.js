import React, {Component, useEffect} from "react";
import Button from "reactstrap/src/Button";
import Form from "reactstrap/src/Form";
import {postWithAuth} from "./API";

class Logout extends Component {

    successHandler(response) {
        console.log(response)
        this.setState({serverMessage: response.data.message})

    }

    async handleSubmit(e) {
        e.preventDefault();
        if (this.validator.allValid()) {
            postWithAuth('logout',
                {data: this.state.data},
                this.successHandler.bind(this));
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }
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
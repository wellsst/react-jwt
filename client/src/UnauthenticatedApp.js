import React, {Component} from 'react';
import RegisterHandler from "./RegisterHandler";

class UnauthenticatedApp extends Component {
    render() {

        return [
            <RegisterHandler/>
        ]
    }
}

export default UnauthenticatedApp;
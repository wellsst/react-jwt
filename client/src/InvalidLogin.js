import React, {Component, useEffect} from "react";
import {Link} from "react-router-dom";

class InvalidLogin extends Component {

    goHome() {
        window.location.reload();
    }

    componentDidMount() {
        /*const timer = setTimeout(() => {
            this.goHome()
        }, 3000);
        return () => clearTimeout(timer);*/
    }

    render() {
        return <p>
            You have been logged out, click here to <Link to="/">Register again</Link>.
        </p>
    }
}

export default InvalidLogin
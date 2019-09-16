import React, {Component, useEffect} from "react";

class LoggedIn extends Component {

    goHome() {
        const {match: {params}, history} = this.props;
        history.push({
            pathname: '/'
        })
        this.forceUpdate();
    }

    componentDidMount() {
        const timer = setTimeout(() => {
            this.goHome()
        }, 3000);
        return () => clearTimeout(timer);
    }

    render() {
        return <p>
            You have been logged in, redirecting you to the start...
        </p>
    }
}

export default LoggedIn
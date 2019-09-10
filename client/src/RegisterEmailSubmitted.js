import React from "react";

class RegisterEmailSubmitted extends React.Component {
    render() {
        return <p>
            Thank you for registering, to finish you simply need to...

            <ol>
                <li>Check your email inbox at: <i>{this.props.location.state.email}</i>, you will shortly receive an email
                    from us with a link that will
                    enable your access on the browser/device you click on the link with only.
                    (if you wish to enable on other devices/browsers then please follow the same simple
                    process on them)
                </li>

                <li>Once prompted, please enter this unique challenge ID: <b> {this.props.location.state.challengeId} </b></li>

            </ol>
            This request will be removed from the system in approx: <b>{this.props.location.state.cleanupOlderThan}</b> minutes.

        </p>
    }
}
export default RegisterEmailSubmitted
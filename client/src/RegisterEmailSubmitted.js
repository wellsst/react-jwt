import React from "react";

class RegisterEmailSubmitted extends React.Component {
    render() {
        return <div>
            <p>
                Thank you for registering, to finish you simply need to...</p>

            <ol>
                <li>Check your email inbox at: <i>{this.props.email}</i>, you will shortly receive an email
                    from us with a link that will
                    enable your access on the browser/device you click on the link with only.
                    (if you wish to enable on other devices/browsers then please follow the same simple
                    process on them)
                </li>

                <li>Once prompted, please enter this unique challenge ID: <b> challengeId </b></li>

            </ol>

            <p>This request will be removed from the system in approx: -cleanupOlderThan- minutes.</p>

        </div>
    }
}
export default RegisterEmailSubmitted
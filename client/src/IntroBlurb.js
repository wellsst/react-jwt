import React from "react";

function IntroBlurb(props) {
    return <p>
        <p>
            Welcome...
        </p>
        <p>
            This is a demo or tutorial of using JSON Web Tokens (JWT) for authentication. Angular in
            the
            front end and Grails in the
            backend.

            The basic steps for the user are:
        </p>

        <ol>
            {/*<li>Start with the <a routerLink="/register">Register for JWT auth</a></li>*/}
            <li>Enter their email address. This will send them a short lived unique URL</li>
            <li>User gets the email and click on the link</li>
            <li>This will generate their secure JWT which will be sent to their browser and stored
                there
            </li>
            <li>Each request that needs a JWT the browser must send it to the server</li>
            <li>The server will be able to authenticate and authorise based on the JWT given</li>
        </ol>
    </p>

}

export default IntroBlurb;
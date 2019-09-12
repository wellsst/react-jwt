import React from 'react'
import {FaSpinner} from 'react-icons/fa'

import {keyframes} from '@emotion/core'
import {AuthService} from "./auth.service";

const AuthContext = React.createContext()

const spin = keyframes({
    '0%': {transform: 'rotate(0deg)'},
    '100%': {transform: 'rotate(360deg)'},
})

export function Spinner(props) {
    return (
        <FaSpinner
            css={{animation: `${spin} 1s linear infinite`}}
            aria-label="loading"
            {...props}
        />
    )
}
export function FullPageSpinner() {
    return (
        <div css={{marginTop: '3em', fontSize: '4em'}}>
            <Spinner />
        </div>
    )
}

function AuthProvider(props) {

    let requestMade = false;

    let authService = new AuthService();
    let user = null;
    if (authService.isLoggedIn()) {
        console.log("User is logged in as: " + authService.getUser())
        user = "loggedIn"
    }
    const data = {user: user};

    // code for pre-loading the user's information if we have their token in localStorage goes here
    // 🚨 this is the important bit.
    // Normally your provider components render the context provider with a value.
    // But we post-pone rendering any of the children until after we've determined
    // whether or not we have a user token and if we do, then we render a spinner
    // while we go retrieve that user's information.

    if (requestMade) {
        return <FullPageSpinner />
    }

    const login = () => {
        this.requestMade = false
        let authService = new AuthService();
        const data = {user: "some user", listItems: []};
        // return authService.isLoggedIn();
        // return authService.isLoggedIn();
    } // make a login request

    const logout = () => {
        let authService = new AuthService();
        authService.logout(); // todo call this from a button
    } // clear the token in localStorage and the user data

    // note, I'm not bothering to optimize this `value` with React.useMemo here
    // because this is the top-most component rendered in our app and it will very
    // rarely re-render/cause a performance problem.
    return (
        <AuthContext.Provider value={{data, login, logout}} {...props} />
    )
}

function useAuth() {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
        throw new Error(`useAuth must be used within a AuthProvider`)
    }
    return context
}

export {AuthProvider, useAuth}

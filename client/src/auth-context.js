import React from 'react'
import {FaSpinner} from 'react-icons/fa'

import {keyframes} from '@emotion/core'

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

    const data = {user: null, listItems: []};

    // code for pre-loading the user's information if we have their token in localStorage goes here
    // 🚨 this is the important bit.
    // Normally your provider components render the context provider with a value.
    // But we post-pone rendering any of the children until after we've determined
    // whether or not we have a user token and if we do, then we render a spinner
    // while we go retrieve that user's information.

    if (requestMade) {
        return <FullPageSpinner />
    }

    const login = () => { this.requestMade = false } // make a login request

    const register = () => {} // register the user

    const logout = () => {} // clear the token in localStorage and the user data

    // note, I'm not bothering to optimize this `value` with React.useMemo here
    // because this is the top-most component rendered in our app and it will very
    // rarely re-render/cause a performance problem.

    return (
        <AuthContext.Provider value={{data, login, logout, register}} {...props} />
    )

}

const useAuth = () => React.useContext(AuthContext)

export {AuthProvider, useAuth}

// the UserProvider in user-context.js is basically:
// const UserProvider = props => (
//   <UserContext.Provider value={useAuth().data.user} {...props} />
// )
// and the useUser hook is basically this:
//const useUser = () => React.useContext(UserContext)
import React from 'react';
import {useUser} from './user-context'
import 'whatwg-fetch';
import {FullPageSpinner} from "./auth-context";

const loadAuthenticatedApp = () => import('./AuthenticatedApp')
const AuthenticatedApp = React.lazy(loadAuthenticatedApp)
const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'))


function App() {
    const user = useUser();
    React.useEffect(() => {
        loadAuthenticatedApp()
    }, [])
    return (
        <React.Suspense fallback={<FullPageSpinner />}>
            {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </React.Suspense>
    )
}

export default App;

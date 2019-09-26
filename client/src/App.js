import React from 'react';
import {useUser} from './user-context'
import 'whatwg-fetch';
import {FullPageSpinner} from "./auth-context";
import IntroBlurb from "./IntroBlurb";

const loadAuthenticatedApp = () => import('./AuthenticatedApp')
const AuthenticatedApp = React.lazy(loadAuthenticatedApp)
const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'))


function App() {
    const user = useUser();
    React.useEffect(() => {
        loadAuthenticatedApp()
    }, [])
    return (

        <div id="content">
            <section className="row colset-2-its">
                <h1>JWT React Template/Demo</h1>
            </section>
            <section className="row colset-2-its">
                <p>
                    <React.Suspense fallback={<FullPageSpinner/>}>
                        {user ? <AuthenticatedApp/> : <UnauthenticatedApp/>}
                    </React.Suspense>
                </p>
            </section>
        </div>
    )
}

export default App;

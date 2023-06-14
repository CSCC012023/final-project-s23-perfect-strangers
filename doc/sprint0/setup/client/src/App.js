import './App.css';
import { useState, useEffect } from "react";
import Signup from './Signup/Signup';
import AccountSetup from './Signup/AccountSetup';

function App() {

    const [signedIn, setSignedIn] = useState(false);

    return (<>
    { 
        (signedIn === false)
            ? <Signup
                signedUpCallBack={() => setSignedIn(true)}
                loginRedirect={() => console.log('requested login page')} />
            : <AccountSetup />
    }
    </>);
}

export default App;
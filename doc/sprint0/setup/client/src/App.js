import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import Signup from './Signup/Signup';
import AccountSetup from './Signup/AccountSetup';

function App() {

    /*
    return (
        <Signup
            signedUpCallBack={(c) => console.log(c)}
            loginRedirect={() => console.log('requested login page')} />
    )
    */

    return (
        <AccountSetup name='bharath' email='bharathvarma169@gmail.com' />
    )
}

export default App;
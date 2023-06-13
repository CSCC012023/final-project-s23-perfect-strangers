import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import Signup from './Signup/Signup';
import AccountSetup from './Signup/AccountSetup';
import { useSelector } from 'react-redux';

function App() {

    const { email, username } = useSelector(state => state.userInfo);

    return (
        <Signup
            signedUpCallBack={() => {
                console.log({email: email, username: username});
            }}
            loginRedirect={() => console.log('requested login page')} />
    )
}

export default App;
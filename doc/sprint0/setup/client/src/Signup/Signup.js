import Axios from "axios";
import { useState } from "react";


const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [cantSignUp, setCantSignUp] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const throwErrMsg = (emsg) => {
        setCantSignUp(true);
        setErrMsg(emsg);
    }

    const onSubmitCallback = (event) => {
        event.preventDefault();
        if(email === '') {
            throwErrMsg('Email field is empty. Please enter a valid email address.');
            return
        } else if(password === '') {
            throwErrMsg('Password field is empty. Please enter your Password.');
            return
        }

        //TODO: call database to check for email e and password p combination.

        //console.log(e, p, u);

        Axios.post("http://localhost:5000/email-auth/", {
            email: email,
            password: password,
            username: username
        }).then((res) => {
            if (res.data.msg === 'user created') {
                //TODO: fetch user info, redirect to user page
            } else if (res.data.err.message !== undefined) {
                throwErrMsg(res.data.err.message);
                console.log(res.data.err);
            } else if (res.data.msg === 'email taken') {
                //TODO: prompt Login page redirect
                console.log('email taken')
            } else {
                throwErrMsg('Given username is already taken. Please try again with another username.');
                console.log(res.data.err);
            }
        })
    }

    return ( <div>
        <form onSubmit={onSubmitCallback} className="signup-form">
            <input 
                type="email"
                value={email}
                placeholder="Email"
                disabled={cantSignUp}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field" />
            <input 
                type="text"
                value={password}
                placeholder="Password"
                disabled={cantSignUp}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field" />
            <input 
                type="text"
                value={username}
                placeholder="Username"
                disabled={cantSignUp}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field" />
            <button 
                type="submit"
                disabled={cantSignUp}
                className="submit-button">
                Sign up </button>
        </form>
        {cantSignUp && <button onClick={() => setCantSignUp(false)} className="err-msg-button">{errMsg}</button>}
    </div> );
}
 
export default Signup;
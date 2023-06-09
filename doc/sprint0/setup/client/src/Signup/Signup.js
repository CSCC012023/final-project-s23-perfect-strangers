import Axios from "axios";
import { useState } from "react";
import styles from './Signup.module.css';

const Signup = ({signedUpCallBack, loginRedirect}) => {

    // signedUpCallBack = (String) => {...do stuff, doesn't care for the return value}
    // signedUpCallBack is a function passed to Signup as a prop
    // it is called with the username when a user is successfully created
    // example in App.js

    // loginRedirect = () => {...do stuff, hopefull redirect to login page}
    // loginRedirect is a function which redirects the user to the login page
    // it is not implemented here, but is passed in as a prop.
    // it should be implemented by the person who is in charge of navigation
    // and then passed in to the Signup component


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [cantSignUp, setCantSignUp] = useState(false);
    const [Msg, setMsg] = useState('Sign Up');

    const throwErrMsg = (emsg) => {             // when user enters invalid info, this function is called
        setCantSignUp(true);                    // it changes the Signup button to display the error msg
        setMsg(emsg);
    }

    const onSubmit = (event) => {       // called when the form is submitted
        event.preventDefault();         // don't update page

        if(cantSignUp) {                // if button is already showing an error, remove the error
            setCantSignUp(false);
            setMsg('Sign Up');
            return;
        }

        // preprocessing errors

        if(email === '') {
            throwErrMsg('Please enter a valid email address.');
            return
        } else if(password === '') {
            throwErrMsg('Please enter your Password.');
            return
        }

        // attempt post operation

        Axios.post("http://localhost:5000/email-auth/", {
            email: email,
            password: password,
            username: username
        }).then((res) => {
            if (res.data.msg === 'user created') {              // new user is created
                signedUpCallBack(username);                     // call signedUpCallBack
            } 
            
            // user could not be created, show error message
            
            else if (res.data.err.message !== undefined) {
                throwErrMsg(res.data.err.message);
                console.log(res.data.err);
            } else if (res.data.msg === 'email taken') {
                //TODO: prompt Login page redirect
                throwErrMsg('Email is already registered, try Logging in')
                console.log('email taken')
            } else {
                throwErrMsg('Given username is already taken');
                console.log(res.data.err);
            }
        })
    }

    return ( 
        <div className={styles.container}>
        <h1 className={styles.heading}>SIGN UP</h1>
        <form onSubmit={onSubmit} className={styles.signupForm}>
            <input 
                type="email"
                value={email}
                placeholder="Email"
                disabled={cantSignUp}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.inputField} />
            <input 
                type="text"
                value={password}
                placeholder="Password"
                disabled={cantSignUp}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputField} />
            <input 
                type="text"
                value={username}
                placeholder="Username"
                disabled={cantSignUp}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.inputField} />
            <button 
                type="submit"
                className={cantSignUp ? styles.errMsgButton : styles.submitButton}>
                {Msg} </button>
        </form>
        <div className={styles.division}>
            <div className={styles.line}></div>
            <p className={styles.signUpWith}>or sign up with</p>
            <div className={styles.line}></div>
        </div>
        <div className={styles.division}>
            <button>TODO: Google Auth</button>
            <button>TODO: Facebook (not Meta) Auth</button>
        </div>
        <div className={styles.loginDiv}>
            already have an account ? 
            <button 
                className={styles.loginButton}
                onClick={loginRedirect}>
                Log in
            </button>
        </div>
    </div> );
}
 
export default Signup;
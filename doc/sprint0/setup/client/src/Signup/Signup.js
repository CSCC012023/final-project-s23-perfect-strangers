import Axios from "axios";
import { useState } from "react";
import styles from './Signup.module.css';
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../redux/userInfo";
import { Link } from "react-router-dom";

const Signup = ({signedUpCallback, loginRedirect}) => {

    // signedUpCallBack = (JSON object) => {...do stuff, doesn't care for the return value}
    // signedUpCallBack is a function passed to Signup as a prop
    // it is called with a JSON object which is guarenteed to have a 'name' and 'email' field
    // example in App.js

    // loginRedirect = () => {...do stuff, hopefull redirect to login page}
    // loginRedirect is a function which redirects the user to the login page
    // it is not implemented here, but is passed in as a prop.
    // it should be implemented by the person who is in charge of navigation
    // and then passed in to the Signup component

    const dispatch = useDispatch();                             // define function which calls redux functions

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [cantSignUp, setCantSignUp] = useState(false);
    const [Msg, setMsg] = useState('Sign Up');      // state for the content of the sign in button

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
            throwErrMsg('Please enter a password.');
            return
        } else if(username === '') {
            throwErrMsg('Please enter a username.');
            return
        }

        // attempt post operation

        Axios.post("http://localhost:5000/email-auth/", {
            email: email,
            password: password,
            username: username
        }).then((res) => {
            if (res.data.msg === 'user created') {              // new user is created
                dispatch(updateUserInfo({
                    email: email,
                    username: username
                }));
                signedUpCallback();
            } 
            
            // user could not be created, show error message
            
            else if (res.data.err.message !== undefined) {
                throwErrMsg(res.data.err.message);
                console.log(res.data.err);
            } else if (res.data.msg === 'email taken') {
                //TODO: prompt Login page redirect
                throwErrMsg('Email is already registered, try Logging in')
                console.log('email taken')
            }
        })
    }

    return ( 
        <div className={styles.container}>
        <h1 className={styles.heading}>SIGN UP</h1>
        <form onSubmit={onSubmit} className={styles.signupForm}>
            <div className={styles.division}>
                <input 
                    type="email"
                    value={email}
                    placeholder="Email"
                    disabled={cantSignUp}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.inputField} />
            </div>
            <div className={styles.division}>
                <input 
                    type="text"
                    value={password}
                    placeholder="Password"
                    disabled={cantSignUp}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.inputField} />
            </div>
            <div className={styles.division}>
                <input 
                    type="text"
                    value={username}
                    placeholder="Username"
                    disabled={cantSignUp}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.inputField} />
            </div>
            
            <button 
                type="submit"
                className={cantSignUp ? styles.errMsgButton : styles.submitButton}>
                {Msg} </button>
        </form>
        <div className={styles.division}>
            <div className={styles.line}></div>
            <p className={styles.text}>or sign up with</p>
            <div className={styles.line}></div>
        </div>
        <div className={styles.division}>
            <button style={{flex: 1}}>TODO: Google Auth</button>
            <button style={{flex: 1}}>TODO: Facebook (not Meta) Auth</button>
        </div>
        <div className={styles.loginDiv}>
            already have an account ?
            <Link to={loginRedirect}>
                <button 
                    className={styles.tButton}>
                    Log in
                </button>
            </Link>
        </div>
    </div> );
}

export default Signup;
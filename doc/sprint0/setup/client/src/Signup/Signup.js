import Axios from "axios";
import { useState } from "react";
import styles from './Signup.module.css';

const Signup = ({signedUpCallBack, loginRedirect}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [cantSignUp, setCantSignUp] = useState(false);
    const [Msg, setMsg] = useState('Sign Up');

    const throwErrMsg = (emsg) => {
        setCantSignUp(true);
        setMsg(emsg);
    }

    const onSubmitCallback = (event) => {
        event.preventDefault();

        if(cantSignUp) {
            setCantSignUp(false);
            setMsg('Sign Up');
            return;
        }

        if(email === '') {
            throwErrMsg('Please enter a valid email address.');
            return
        } else if(password === '') {
            throwErrMsg('Please enter your Password.');
            return
        }

        Axios.post("http://localhost:5000/email-auth/", {
            email: email,
            password: password,
            username: username
        }).then((res) => {
            if (res.data.msg === 'user created') {
                signedUpCallBack(username);
            } else if (res.data.err.message !== undefined) {
                throwErrMsg(res.data.err.message);
                console.log(res.data.err);
            } else if (res.data.msg === 'email taken') {
                //TODO: prompt Login page redirect
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
        <form onSubmit={onSubmitCallback} className={styles.signupForm}>
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
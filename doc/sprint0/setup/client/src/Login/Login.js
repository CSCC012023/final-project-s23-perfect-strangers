import Axios from "axios";
import { useState } from "react";
import styles from "./Login.module.css";
import React, { component } from "react";
import { Link } from "react-router-dom";

//const jwt = require("jsonwebtoken");

const Login = ({ loggedInCallBack, SignUpRedirect }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [cantLogin, setcantLogin] = useState(false);
  const [Msg, setMsg] = useState("Login");

  const throwErrMsg = (emsg) => {
    // when user enters invalid info, this function is called
    setcantLogin(true); // it changes the Signup button to display the error msg
    setMsg(emsg);
  };

  const onSubmit = (event) => {
    // called when the form is submitted
    event.preventDefault(); // don't update page

    if (cantLogin) {
      // if button is already showing an error, remove the error
      setcantLogin(false);
      setMsg("Login");
      return;
    }

    //     // preprocessing errors

    if (email === "") {
      throwErrMsg("Please enter Email");
      return;
    } else if (password === "") {
      throwErrMsg("Please enter Password");
      return;
    }

    //post operation

    Axios.post("http://localhost:5000/login", {
      email: email,
      password: password,
    }).then((res) => {
      // Handle the login response according to your requirements
      if (res.data.user) {
        // Redirect the user or perform any other necessary actions
        console.log(res.data.user.token);
        console.log("Login success");

        localStorage.setItem("token", res.data.user.token);
      } else {
        throwErrMsg(res.data.err);
        console.log(res.data.err);
        console.log("Login failed");
      }
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>LOGIN</h1>
      <form onSubmit={onSubmit} className={styles.loginForm}>
        <input
          type="email"
          value={email}
          placeholder="Email"
          disabled={cantLogin}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="text"
          value={password}
          placeholder="Password"
          disabled={cantLogin}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.inputField}
        />
        {/* <input 
                type="text"
                value={username}
                placeholder="Username"
                disabled={cantLogin}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.inputField} /> */}
        <Link to={loggedInCallBack}>
          <button
            type="submit"
            className={cantLogin ? styles.errMsgButton : styles.submitButton}
          >
            {Msg}
          </button>
        </Link>
      </form>
      <div className={styles.division}>
        <div className={styles.line}></div>
        <p className={styles.logInWith}>or login with</p>
        <div className={styles.line}></div>
      </div>
      <div className={styles.division}>
        <button>TODO: Google Auth</button>
        <button>TODO: Facebook (not Meta) Auth</button>
      </div>
      <div className={styles.SignUpDiv}>
        Need an account ?
        <Link to={SignUpRedirect}>
          <button className={styles.SignUpButton}>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;

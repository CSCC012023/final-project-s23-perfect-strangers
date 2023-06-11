import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import Signup from './Signup/Signup';
import Login from './Login/Login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [redirectToSignup, setRedirectToSignup] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const signupRedirect = () => {
    setRedirectToSignup(true);
  };
  const loginRedirect = () => {
    setRedirectToLogin(true);
  };

  return (
    <Router>
      {redirectToSignup && <Navigate to="/signup" replace />}
      {redirectToLogin && <Navigate to="/login" replace />}
      <Routes>
        <Route path="/" element={<Login loggedInCallBack={(username) => console.log(username)} SignUpRedirect={signupRedirect} />} />
        <Route path="/signup" element={<Signup loginRedirect = {loginRedirect}/>} />
        <Route path="/login" element={<Login loggedInCallBack={(username) => console.log(username)} SignUpRedirect={signupRedirect} />} />
      </Routes>
    </Router>
  );

  // return (
  //   <div>
  //     <Login
  //       loggedInCallBack={(username) => console.log(username)}
  //       SignUpRedirect={() => console.log('requested signup')}
  //     />
  //   </div>
  // )
}

export default App;
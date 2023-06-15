import "./App.css";
import { useState } from "react";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import ExamplePage from "./ExamplePage/ExamplePage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

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
        <Route
          path="/"
          element={
            <Login
              loggedInCallBack={(username) => console.log(username)}
              SignUpRedirect={signupRedirect}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup signedUpCallBack={(username) => console.log(username)} />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              loggedInCallBack={(username) => console.log(username)}
              SignUpRedirect={signupRedirect}
            />
          }
        />
        <Route path="/examplepage" element={<ExamplePage />} />
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

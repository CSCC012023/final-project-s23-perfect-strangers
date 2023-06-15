import { useState } from "react";
import SignupHub from "./Signup/SignupHub";
import Login from "./Login/Login";
import ExamplePage from "./ExamplePage/ExamplePage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Login
              loggedInCallBack={'/examplepage'}
              SignUpRedirect={'/signup'}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignupHub accountSetupCallback={"/"} loginRedirect={"/"} />
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

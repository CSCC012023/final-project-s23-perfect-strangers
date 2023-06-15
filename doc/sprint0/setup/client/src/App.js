import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Invites from "./pages/Invites";
import Account from "./pages/Account";
import Logout from "./pages/Logout";
import CreateEvents from "./pages/CreateEvents";
import SignupHub from "./Signup/SignupHub";
import Login from "./Login/Login";
import ExamplePage from "./ExamplePage/ExamplePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/invites" exact element={<Invites />} />
          <Route path="/account" exact element={<Account />} />
          <Route path="/logout" exact element={<Logout />} />
          <Route path="/create-events" exact element={<CreateEvents />} />
          <Route
            path="/"
            element={
              <Login
                loggedInCallBack={"/dashboard"}
                SignUpRedirect={"/signup"}
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
    </>
  );
}

export default App;

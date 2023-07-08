import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import BioPage from "./components/BioPage";
import Dashboard from "./pages/Dashboard";
import Invites from "./pages/Invites";
import Account from "./pages/Account";
import Logout from "./pages/Logout";
import CreateEvents from "./pages/CreateEvents";
import SignupHub from "./Signup/SignupHub";
import Login from "./Login/Login";

import ExamplePage from "./ExamplePage/ExamplePage";
import RequestsPage from "./Requests/RequestsPage";

import ChatPage from "./Chat/ChatPage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RequestsSent from "./pages/RequestsSent";


import Socket from "./Socket";
function App() {
  return (
    <div>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/invites" exact element={<Invites />} />
          <Route path="/requests-sent" exact element={<RequestsSent />} />
          <Route path="/account" exact element={<Account />} />
          <Route path="/logout" exact element={<Logout />} />
          <Route path="/create-events" exact element={<CreateEvents />} />
          <Route path="/bio-page" exact element={<BioPage/>} />
          <Route path="/chats" exact element={<ChatPage />} />
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
          <Route path="/requests" element={<RequestsPage /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

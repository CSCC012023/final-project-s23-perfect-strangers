<<<<<<< HEAD
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
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
=======
import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import CreateEvents from './CreateEvents';
>>>>>>> a0269778 (Implemented User Event Creation Component)

function App() {
  return (
<<<<<<< HEAD
    <div>

      <Router>
        <Sidebar />
        <Routes>
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/invites" exact element={<Invites />} />
          <Route path="/account" exact element={<Account />} />
          <Route path="/logout" exact element={<Logout />} />
          <Route path="/create-events" exact element={<CreateEvents />} />
          <Route path="/bio-page" exact element={<BioPage/>} />
          <Route
            path="/"
            element={
              <Login
                loggedInCallBack={"/dashboard"}
                SignUpRedirect={"/signup"}
              />
            }
=======
    <div className="App">
      <div className='eventCreation'>
        <CreateEvents />
      </div>
      <div className='usersDisplay'>
        {listOfUsers.map((user) => {
          return (
          <div>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <h1>Username: {user.username}</h1>
            <hr/>
          </div>)
        })
        }
      </div>
      <div>
        <input 
        type='text' 
        placeholder='Name' 
        onChange={(event) => {
          setName(event.target.value);
          }}
>>>>>>> a0269778 (Implemented User Event Creation Component)
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

    </div>

  );
}

export default App;

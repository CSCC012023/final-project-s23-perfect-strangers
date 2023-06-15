import './App.css';

import SignupHub from './Signup/SignupHub';

import { useState, useEffect } from "react";
import Axios from "axios";
import BioPage from "./BioPage";
import UserBio from "./UserBio";


function App() {

/*
    return (
        <SignupHub 
            accountSetupCallback={() => console.log('account set up')}
            loginRedirect={() => console.log('requested login page')}/>
    )
*/
  useEffect(() => {
    Axios.get("http://localhost:5000/api/users").then((response) => {
      setListOfUsers(response.data);
    });
    console.log(listOfUsers);
  }, []);


  const createUser = () => {
    Axios.post("http://localhost:5000/api/users/", {
      name: name, 
      age: age, 
      username: username,
    }).then((response) => {
      setListOfUsers([...listOfUsers, {
        name: name, 
        age: age, 
        username: username,
      }])
      alert("User Created!");
    });
  };

  return (
    <div className="App">
      <BioPage/>
    </div>
  );

}

export default App;
import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import BioPage from "./BioPage";
import UserBio from "./UserBio";

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");

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
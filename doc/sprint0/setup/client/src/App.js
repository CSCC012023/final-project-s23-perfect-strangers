import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import MisccObject from './MisccObject';

const makeid = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}


function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");

  const [objects, setObjects] = useState([]);

  const [objSize, setObjSize] = useState(0);

  useEffect(() => {
    Axios.get("http://localhost:5000/users/").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get('http://localhost:5000/objects/').then(
      (res) => {
        setObjects(res.data);
        setObjSize(objects.length);
        console.log('got objects');
      }
    )
  }, [objSize]);

  console.log('got ' + objects.length + ' objects')

  const createUser = () => {
    Axios.post("http://localhost:5000/users/add/", {
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

  const addObject = () => {
    const objName = makeid(20);
    Axios.post('http://localhost:5000/objects/', {
      name: objName
    }).then((res) => {
      setObjSize(objSize+1);
    })
  }

  return (
    <div className="App">
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
          />

        <input 
        type='number' 
        placeholder='Age'
        onChange={(event) => {
          setAge(event.target.value);
          }}/>

        <input 
        type='text' 
        placeholder='Username'
        onChange={(event) => {
          setUsername(event.target.value);
          }}/>
        <button onClick={createUser}> Create User</button>
      </div>
      <div>
        <button onClick={addObject}>add object</button>
        {objects.map((obj) => {
          return (
            <MisccObject 
              name={obj.name}
              _id={obj._id}
              embd={obj.embed}
              delFunc={() => {
                Axios.delete('http://localhost:5000/objects/'+obj._id)
                  .then(()=>{
                    setObjSize(objSize-1);
                  })
              }}
              updateEmbedFunc={(eElem) => {
                let objectsCopy = objects;
                let i = objects.findIndex((object) => object._id === obj._id);
                objectsCopy[i] = {embed: eElem, ...objects[i]};
                setObjects(objectsCopy);
              }} />
          )
        })}
      </div>
    </div>
  );
}

export default App;
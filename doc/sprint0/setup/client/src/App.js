import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import Signup from './Signup/Signup';

function App() {
  return (
    <div>
      <Signup
        signedUpCallBack={({name, email}) => {
          console.log("name: " + name + ", email: " + email);
        }}
        loginRedirect={() => console.log('requested login')}
      />
    </div>
  )
}

export default App;
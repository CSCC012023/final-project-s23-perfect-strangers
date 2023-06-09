import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import Signup from './Signup/Signup';

function App() {
  return (
    <div>
      <Signup
        signedUpCallBack={(username) => console.log(username)}
        loginRedirect={() => console.log('requested login')}
      />
    </div>
  )
}

export default App;
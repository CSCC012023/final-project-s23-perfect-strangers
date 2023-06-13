import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Invites from './pages/Invites';
import Account from './pages/Account';
import Logout from './pages/Logout';
import CreateEvents from './pages/CreateEvents';

function App() {
  
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/invites" exact element={<Invites />} />
          <Route path="/account" exact element={<Account />} />
          <Route path="/logout" exact element={<Logout />} />
          <Route path="/create-events" exact element={<CreateEvents />} />
        </Routes>
      </Router>
    </>
  );

}

export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Tillsignup/Homepage";
import SignUp from "./Tillsignup/SignUp";
import socketIO from 'socket.io-client';
const socket = socketIO.connect('https://chatleee.onrender.com');
import './index.css';
import Signin from "./Tillsignup/Signin";
import Account from "./Home/Account";


function App() {
  return (
    
    <Router>
      <Routes>
        
        <Route path="/" element={<Homepage socket={socket} />} />
        <Route path="/sign-up" element={<SignUp socket={socket} />} />
        <Route path="/sign-in" element={<Signin socket={socket} />} />
        <Route path="/Account" element={<Account socket={socket} />} />
   
     
      </Routes>
    </Router>
  );
}

export default App;

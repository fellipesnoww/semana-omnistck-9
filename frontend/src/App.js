import React from 'react';
import './App.css';

import logo from './assets/logo.svg';

import Routes from './routes';

function App() {
 
  return (
    <h1 className="container">
      <img src={logo} alt="AirCnc" />
      
      <div className="content">
        <Routes></Routes>
        
      </div>
    </h1>
  );
}

export default App;

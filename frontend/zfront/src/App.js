import React, { createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Login from './Components/Login/Login';
import User from './Components/User/User';
import CreateAccount from './Components/CreateAccount/CreateAccount';
import './App.css';

export const AppContext = createContext()

function App() {
  const navigate = useNavigate();


  return (
    <>

      <div className='HeaderStyle' id='header'>
            <h1 className='HeaderTitle' id='header-title' onClick={() => navigate('/')}>Z App</h1>
      </div>

      <AppContext.Provider >
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/visitor" element={<User/>}/>
            {/* <Route path="/manager" element={<Manager/>}/> */}
            <Route path="/createaccount" element={<CreateAccount/>}/>
        </Routes>
      </AppContext.Provider>

    </>
  );
}

export default App;
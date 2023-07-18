import React, { createContext } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

// This is the styling section 


// This is the styling section 
// Below is the Fetch and variable setting


function Login() {
  const navigate = useNavigate()

  const getInitialState = () => {
    const value = 'user';
    return value;
  };

  const [signIn, setSignIn] = useState(getInitialState);

  const handleChange = (e) => {
    setSignIn(e.target.value)
  };



  return (
    <>
      <div className='FormContainer'>
        <h1>Web Page Login</h1>
        <div>
          <label for='loginSelect'>Role: </label>
          <select value={signIn} onChange={handleChange} id="loginSelect">
            <option value='/user'>User</option>
            <option value='/manager'>Manager</option>
          </select>
        </div>
        <div>
          <input className='userInputs' name='UserId' placeholder="UserName..." type='text' />
          <input className='userInputs' name='PassWord' placeholder="User Password..." type='password' />
        </div>
        <button className='LoginBtn' onClick={() => navigate(`${signIn}`)}>Login</button>
        <button className='LoginBtn' onClick={() => navigate(`createaccount`)}>Create Account</button>
      </div>
    </>
  );
}

export default Login;
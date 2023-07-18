import React, { useEffect } from 'react';
import { useState,} from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';






function Login() {

  const navigate = useNavigate()

  const getInitialState = () => {
    const value = 'visitor';
    return value;
  };

  const [signIn, setSignIn] = useState(getInitialState);
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')


  const handleChange = (e) => {
    setSignIn(e.target.value)
  };

  const handleSubmit = (e) => {
    setUserName(username)
    setPassword(password)
    // console.log({username: username, password: password})
    navigate(`${signIn}`)
  }

  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('http://localhost:8081/userlist')
      .then((res) => res.json())
      .then(data => {
        setUsers(data)
      })
      .catch(error=>console.log('this isnt working'))
  },[])

// console.log(users)


  return (
    <>
      <div className='FormContainer'>
        <h1>Web Page Login</h1>
        <div>
          <label for='loginSelect'>Role: </label>
          <select value={signIn} onChange={handleChange} id="loginSelect">
            <option value='/visitor'>Visitor</option>
            <option value='/manager'>Manager</option>
          </select>
        </div>
        <div>
            <form id='myForm' onSubmit = {handleSubmit}>
                <label> User Name:</label> 
                <input
                    type='text'
                    value={ username }
                    onChange={(e) => setUserName(e.target.value)}
                    /><br></br>

                <label> Password: </label> 
                <input
                    type='text'
                    value={ password }
                    onChange={(e) => setPassword(e.target.value)}
                    />
            </form>
          {/* <input className='userInputs' name='UserId' placeholder="UserName..." type='text' />
          <input className='userInputs' name='PassWord' placeholder="User Password..." type='password' /> */}
        </div>
        <button className='LoginBtn' onClick={() => {handleSubmit()}}>Login</button>
        <button className='LoginBtn' onClick={() => navigate(`createaccount`)}>Create Account</button>
      </div>
    </>
  );
}

export default Login;
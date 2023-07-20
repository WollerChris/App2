import React, { useEffect } from 'react';
import { useState,} from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';






function Login() {

  const navigate = useNavigate()

  const [signIn, setSignIn] = useState('');
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])
//   const [id, setManagerId] = useState()



  const handleChange = (e) => {
    setSignIn(e.target.value)
  };

  const handleSubmit = (e) => {
    setUserName(username)
    setPassword(password)
    valid()
  }

  const valid = () => {
    // console.log(signIn)
    let validManager = users.find((manager) => (manager.username === username &&  manager.password === password)
    )
        
    if (validManager && signIn === '/manager') {
        users.map((manager) => { if (manager.username === username) {
            let id = manager.id
      
            navigate(`manager/${id}`,{ state: manager.fname })
        }})
    } else if(signIn === '/visitor') {

        navigate(`${signIn}`)
    } else if(!validManager && signIn === '/manager'){
        alert('Either your username and password are incorrect or you do not have valid Manger account. Either try again, log in as visitor or create account')
    }
  }

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
            <option value='/'>Select Role</option>
            <option value='/visitor'>Visitor</option>
            <option value='/manager'>Manager</option>
          </select>
        </div>
        <div>
            <form className='loginform' id='myForm' onSubmit = {handleSubmit}>
                <label> User Name:</label> 
                <input
                    type='text'
                    value={ username }
                    onChange={(e) => setUserName(e.target.value)}
                    /><br></br>
                      <br></br>
                <label> Password: </label> 
                <input
                    type='text'
                    value={ password }
                    onChange={(e) => setPassword(e.target.value)}
                    />
            </form>
        </div>
        <button className='LoginBtn' onClick={() => {handleSubmit()}}>Login</button>
        <button className='LoginBtn' onClick={() => navigate(`createaccount`)}>Create Account</button>
        <p> If you are a visitor select "vistor" from role dropdown. No other information required.</p>  
        <p>If you are a manager select 
            "manager" role utilizing your account username and password. If you need manager permissions 
            create a manager account. 
        </p>
      </div>
    </>
  );
}

export default Login;
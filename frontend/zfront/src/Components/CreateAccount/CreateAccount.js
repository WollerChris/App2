import { useState } from 'react';
import './CreateAccount.css';
import { useNavigate } from 'react-router-dom';



function CreateAccount() {
  const navigate = useNavigate()
  const [fname, setfName] = useState('')
  const [lname, setlName] = useState('')
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')


  const handleSubmit = (e) => {
    setfName(fname)
    setlName(lname)
    setUserName(username)
    setPassword(password)
    alert(`Account for ${fname} , ${lname} has been created`)
    console.log({fname: fname, lname: lname, username: username, password: password})
    navigate('/')


    fetch('http://localhost:8081/createaccount', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
              },
              body: JSON.stringify({fname: fname, lname: lname, username: username, password: password})
            })
    .then(response => response.json()
    ).then(function (data) {
      console.log(data)
      window.location.reload();
    })
  }


    return (
        <div className='FormInput'>
            <div className='FormHeader'>
                <h1 className='FormTitle'>Details for your account</h1>
            </div>
            <div>
                <form id='myForm' onSubmit = {handleSubmit}>
                <label> First Name:  </label> 
                <input
                    type='text'
                    value={ fname }
                    onChange={(e) => setfName(e.target.value)}
                    /><br></br>

                <label> Last Name: </label> 
                <input
                    type='text'
                    value={ lname }
                    onChange={(e) => setlName(e.target.value)}
                    /><br></br>

                </form>
                <form id='myForm' onSubmit = {handleSubmit}>
                <label> User Name:</label> 
                <input
                    type='text'
                    value={ username }
                    onChange={(e) => setUserName(e.target.value)}
                    /><br></br>

                <label> Password:   </label> 
                <input
                    type='text'
                    value={ password }
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </form>
            </div>
            <button className='AddBtn' onClick={() => {handleSubmit()}}>ADD</button>
        </div>
    )}


export default CreateAccount;
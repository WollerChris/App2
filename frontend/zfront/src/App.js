import React, { createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Login from './Components/Login/Login';
import CreateAccount from './Components/CreateAccount/CreateAccount';
import './App.css';

export const AppContext = createContext()

function App() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([])
  const [inventory, setInventory] = useState([])



  useEffect(() => {
    fetch('http://localhost:8081/userlist')
      .then((res) => res.json())
      .then(data => {
        setUsers(data)
      })
      .catch(error=>console.log('this isnt working'))
  },[])

console.log(users)

  return (
    <>

      <div className='HeaderStyle' id='header'>
            <h1 className='HeaderTitle' id='header-title' onClick={() => navigate('/')}>Z App</h1>
      </div>

      {/* this is the breadcromb bar */}
      <AppContext.Provider users={users} invenntory={inventory}>
        <Routes>
            <Route path="/" element={<Login/>}/>
            {/* <Route path="/user" element={<User/>}/>
            <Route path="/manager" element={<Manager/>}/> */}
        <Route path="/createaccount" element={<CreateAccount/>}/>

        </Routes>
      </AppContext.Provider>

    </>
  );
}

export default App;
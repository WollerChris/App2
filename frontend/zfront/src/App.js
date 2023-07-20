import React, { createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import Login from './Components/Login/Login';
import User from './Components/User/User';
import Manager from './Components/Manager/Manager';
import CreateAccount from './Components/CreateAccount/CreateAccount';
import Additem from './Components/Additem/Additem';
import UpdateItem from './Components/UpdateItem/UpdateItem';
import './App.css';
import MyInventory from './Components/MyInventory/MyInventory';


export const AppContext = createContext()

function App() {
  const navigate = useNavigate();


  return (
    <>

      <div className='HeaderStyle' id='header'>
            <h1 className='HeaderTitle' id='header-title' onClick={() => navigate('/')}>Z App</h1>
            <button className='ReturnBtn' onClick={() => navigate(`/`)} >Login Page</button>
      </div>

      <AppContext.Provider >
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/visitor" element={<User/>}/>
            <Route path="/manager/:id" element={<Manager/>}/>
            <Route path="/createaccount" element={<CreateAccount/>}/>
            <Route path="/manager/:id/additem" element={<Additem/>}/>
            <Route path="/manager/:id/updateitem" element={<UpdateItem/>}/>
            <Route path="/manager/:id/myinventory" element={<MyInventory/>}/>

        </Routes>
      </AppContext.Provider>

    </>
  );
}

export default App;
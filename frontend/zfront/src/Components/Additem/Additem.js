import { useState } from 'react';
import './Additem.css';
import { useNavigate, useLocation } from 'react-router-dom'



function Additem() {
    const navigate = useNavigate()
    const hello = useLocation().state;




  

    return (
      <>
        <h1> Does this work </h1>
      </>
    );
  }

  export default Additem;
 
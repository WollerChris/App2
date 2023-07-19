import { useState } from 'react';
import './Additem.css';
import { useNavigate, useLocation } from 'react-router-dom'



function Additem() {
    const navigate = useNavigate()
    const useridstrng = useLocation().state;
    const [itemname, setName] = useState()
    const [description, setDescription] = useState()
    const [quantitystrng, setQuantity] = useState()

console.log(`Id passed to addItem is: ${useridstrng}`)


const handleSubmit = (e) => {
        // console.log(userid, itemname, description, quantity)
    let userid = parseInt(useridstrng)
    let quantity = parseInt(quantitystrng)
    // const Update = {numUserId, itemname, description, numQuantity}
    navigate(`/manager/${useridstrng}`)
    console.log(userid , quantity)

    fetch('http://localhost:8081/addItem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
                },
                body: JSON.stringify({userid: userid, itemname: itemname, description: description, quantity: quantity})
      })
      .then(response => response.json()
      ).then(function (data) {
        console.log(data)
      })
    };



  

    return (
      <>
        <div className='AFormInput'>
                  <div className='AFormHeader'>
                    <h1 className='AFormTitle'>Complete Form to Add Item: </h1>
                  </div>
                  <div className='AFormDetails'>

                      <form id='myForm' onSubmit = {handleSubmit}>
                            <label> Name:  </label> 
                            <input
                              type='text'
                              value={ itemname }
                              onChange={(e) => setName(e.target.value)}
                              />

                            <label> Details: </label> 
                            <input
                              type='text'
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              />

                            <label> Quantity: </label> 
                            <input
                              type='number'
                              value={ quantitystrng }
                              onChange={(e) => setQuantity(e.target.value)}
                              />                            
                      </form>
                            
                  </div>
                  <div className='Footer'>
                    <button className='SubmitBtn' onClick={() => {handleSubmit()}}>Add Item</button>
                  </div>
            </div>
      </>
    );
  }

  export default Additem;
 
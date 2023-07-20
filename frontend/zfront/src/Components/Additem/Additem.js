import { useState } from 'react';
import './Additem.css';
import { useNavigate, useLocation } from 'react-router-dom'



function Additem() {
  //this section will set the states of the form so it can be posted to the database
    const navigate = useNavigate()
    const useridstrng = useLocation().state;
    const [itemname, setName] = useState()
    const [description, setDescription] = useState()
    const [quantitystrng, setQuantity] = useState()

//this section will handle the post to the database using fetch.  
const handleSubmit = (e) => {
  //below i user parseInt to turn the string into a number format to match the database
    let userid = parseInt(useridstrng)
    let quantity = parseInt(quantitystrng)
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
      window.location.reload()
    };


    return (
      <>
        <div className='UpdateFormInput'>
                  <div className='AFormHeader'>
                    <h1 className='AFormTitle'>Complete Form to Add Item: </h1>
                  </div>
                  <div className='updateFormDetails'>

                      <form id='myForm' onSubmit = {handleSubmit}>
                            <label> Name:  </label> 
                            <input
                              type='text'
                              value={ itemname }
                              onChange={(e) => setName(e.target.value)}
                              /> <br></br><br></br>

                            <label> Details: </label> 
                            <input
                              type='text'
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              /><br></br><br></br>

                            <label> Quantity: </label> 
                            <input
                              type='number'
                              value={ quantitystrng }
                              onChange={(e) => setQuantity(e.target.value)}
                              /> <br></br><br></br>                   
                      </form>
                            
                  </div>
                  <div className='Footer'>
                    <button className='UpdateCreateBtn' onClick={() => {handleSubmit()}}>Add Item</button>
                  </div>
            </div>
      </>
    );
  }

  export default Additem;
 
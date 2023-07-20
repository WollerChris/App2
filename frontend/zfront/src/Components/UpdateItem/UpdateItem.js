import { useState } from 'react';
import './UpdateItem.css';
import { useNavigate, useLocation } from 'react-router-dom'



function UpdateItem() {
  //This part of the code pulls the details using the useLocation feature and saves as a varaible to be used later
    const navigate = useNavigate()
    const itemname1 = useLocation().state.itemname;
    const hello = useLocation().state.name
    const description1 = useLocation().state.description;
    const userid1 = useLocation().state.userid;
    const quantity1 = useLocation().state.quantity;
    const manager1 = useLocation().state.manager;
    const id1 = useLocation().state.id;

    //this area sets the states for the form
    const [id, setItemId] = useState(id1)
    const userid = userid1
    const [itemname, setName] = useState(itemname1)
    const [description, setDescription] = useState(description1)
    const [quantity, setQuantity] = useState(quantity1)


    //this will put your updated details to the database and than return you back to the manager page
const handleUpdate = (e) => {
    navigate(`/manager/${manager1}`,{ state: hello })

    fetch('http://localhost:8081/updateitem', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
                },
                body: JSON.stringify({id : id, userid: userid, itemname: itemname, description: description, quantity: quantity})
      })
      .then(response => response.json()
      ).then(function (data) {
        console.log(data)
      })
      window.location.reload()
    };

    return (
      <>
        <div className='EditFormInput'>
                  <div className='AFormHeader'>
                    <h1 className='AFormTitle'>Complete Form to Update Item: </h1>
                  </div>
                  <div className='AFormDetails'>

                      <form id='myForm' onSubmit = {handleUpdate}>
                      <label> Item ID:  </label> 
                            <input
                              type='text'
                              value={ id }
                              onChange={(e) => setItemId(e.target.value)}
                              /><br></br> <br></br>
                            <label> Name:  </label> 
                            <input
                              type='text'
                              value={ itemname }
                              onChange={(e) => setName(e.target.value)}
                              /><br></br> <br></br>

                            <label> Details: </label> 
                            <input
                              type='text'
                              maxlength = "250"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              /><br></br> <br></br>

                            <label> Quantity: </label> 
                            <input
                              type='number'
                              value={ quantity }
                              onChange={(e) => setQuantity(e.target.value)}
                              />                            
                      </form>
                            
                  </div>
                  <div className='Footer'>
                    <button className='EditCreateBtn' onClick={() => {handleUpdate()}}>Update Item</button>
                  </div>
            </div>
      </>
    );
  }

  export default UpdateItem;
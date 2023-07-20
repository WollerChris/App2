import { useState } from 'react';
import './MyInventory.css';
import { useEffect} from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { filter } from 'lodash';



function MyInventory() {
    const navigate = useNavigate()
    const hello = useLocation().state;
    const { id } = useParams();

    const [loading, setLoading] = useState(true)
    const [inventory, setInventory] = useState([])
    const [searchText, setSearchText] = useState('')
    const [name, setname] = useState('')
    const [description, setdescription] = useState('')
    const [quantity, setquantity] = useState('')
    const [displaying, setDisplaying] = useState(false)
    const [modifier, setModifier] = useState()
    const [itemid, setItemId] = useState()
    const [editItem, setEditItem] = useState(false)
    const [filteredData, setFilteredData] = useState([])
console.log(id)
console.log(filteredData)

    useEffect(() => {
      fetch('http://localhost:8081/items')
        .then((res) => res.json())
        .then(data => {
          setInventory(data)
          setLoading(false)
        })
        .catch(error=>console.log('this isnt working'))
    },[])
  


  const AllData = (item) => {
    // setid(item.id)
    setDisplaying(true)
    setname(item.itemname)
    setdescription(item.description)
    setquantity(item.quantity)
    setModifier(item.userid)
    setItemId(item.id)
    console.log(item.itemname)
  }

  const handleUpdate = () => {
    setEditItem(true)
  }

  const pushUpdate = () => {
    if (displaying === false){
        alert('select item to update')
      } else if (displaying === true) {
        console.log({userid: id, itemname: name, description: description, quantity: quantity})
        fetch('http://localhost:8081/updateitem', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({userid: id, itemname: name, description: description, quantity: quantity})
          })
          .then(response => response.json()
          ).then(function (data) {
            console.log(data)
          })
          window.location.reload()
      }
  }

  const pushAdd = () => {


    fetch('http://localhost:8081/addItem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
                },
                body: JSON.stringify({userid: id, itemname: name, description: description, quantity: quantity})
      })
      .then(response => response.json()
      ).then(function (data) {
        console.log(data)
      })
      window.location.reload()
  }

  const handleDelete = () => {
    if (displaying === false){
      alert('select item to Delete')
    } else if (displaying === true) {
      // const data = {id: itemid}
      alert(`Item deleted`)
      fetch('http://localhost:8081/deleteitem', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: itemid})
      })
      .then(response => response.json()
      ).then(function (data) {
        console.log(data)
      })
      window.location.reload();

    };
  }


  const filterdata = mine => {
    setFilteredData(
      inventory.filter(myItem => {
        console.log(myItem)
        return myItem.userid == id
      })
    )
  }

const handleSubmit = () => {
    
}


  if (loading){
    return <p>loading</p>
  }
    return (
    <>
      <div className='MIheaderBar'>
        <h2 className='pstyle'>{`Welcome, button to see your personal inventory below.`}</h2>
        <button className='UBtn' onClick={() => {filterdata()}} >Click To View My Inventory </button>
        <button className='linkBtn' onClick={() => navigate(`/manager/${id}`,{state: hello})} >Main Inventory</button>

      </div>

      <div className='fullcontainer'>
        {/* {inventory.filter(item => item.itemname.includes(searchText)) */}
        {filteredData.map(item => (
            <div className='singleItemContainer' onClick={() => AllData(item)}>
                <div className='itemHeader'>
                  <p className='idstyle'>Item ID: {item.id}</p>
                  <h3>Item Name: {item.itemname}</h3>
                </div>
              <p>Item Description: {item.description}...</p>
              <p>Inventory: {item.quantity}</p>
              <p>Added By: {item.userid}</p>

            </div>
          ))
        }
      </div>

      <div className='Mlower'>
        <div>
          { editItem ? 
                <div className='MdetailareaEdit'>
                   <div className='AFormInput'>
                  <div className='AFormHeader'>
                    <h1 className='AFormTitle'>Complete Form to Add Item: </h1>
                  </div>
                  <div className='AFormDetails'>

                      <form id='myForm2' onSubmit = {handleSubmit}>
                            <label> Name:  </label> 
                            <input
                              type='text'
                              value={ name }
                              onChange={(e) => setname(e.target.value)}
                              />

                            <label> Details: </label> 
                            <input
                              type='text'
                              value={description}
                              onChange={(e) => setdescription(e.target.value)}
                              />

                            <label> Quantity: </label> 
                            <input
                              type='number'
                              value={ quantity }
                              onChange={(e) => setquantity(e.target.value)}
                              />                            
                      </form>
                        
                  </div>
                  <div className='Footer'>
                    <button className='SubmitBtn' onClick={() => {pushAdd()}}>Add Item</button>
                    <button className='SubmitBtn' onClick={() => {pushUpdate()}}>Update Item</button>
                  </div>
            </div>


                </div>
            :
                <div className='Mdetailarea'>
                    <h1 className='Mdetailtitle'>Item Name: {name} </h1>
                    <h3 className='MdetailsOther'>Description: {description} </h3>
                    <p className='MdetailsOther'>Quantity: {quantity}</p>
                </div>
            }
        </div>
        <div className='btnGroup'>
            {/* <button className='ABtn' onClick={() => navigate(`/manager/${id}/addItem`,{ state: id })} >Add Item</button>
            <button className='UBtn' onClick={() => {handleUpdate()}} >Update Item </button> */}
            <button className='EditItemBtn' onClick={() => {handleUpdate()}}>Add/Edit Item</button>
            <button className='DeleteItemBtn' onClick={() => {handleDelete()}}>DeleteItem</button>

        </div>
      </div>
  </>
    
    );
  }
  

  export default MyInventory;
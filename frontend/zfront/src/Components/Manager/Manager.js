import { useState } from 'react';
import './Manager.css';
import { useEffect} from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom'



function Manager() {
    const navigate = useNavigate()
    const hello = useLocation().state;
    const { id } = useParams();
  //this area sets the state for the application
    const [loading, setLoading] = useState(true)
    const [inventory, setInventory] = useState([])
    const [name, setname] = useState('')
    const [description, setdescription] = useState('')
    const [quantity, setquantity] = useState('')
    const [displaying, setDisplaying] = useState(false)
    const [modifier, setModifier] = useState()
    const [itemid, setItemId] = useState()
    const [deleteItem, setDeleteItem] = useState(false)

//this section will retrieve the inventory
    useEffect(() => {
      fetch('http://localhost:8081/items')
        .then((res) => res.json())
        .then(data => {
          setInventory(data)
          setLoading(false)
        })
        .catch(error=>console.log('this isnt working'))
    },[])
  

//this area will set the variable to be later pushed for update and add 
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

  //this section wil take all necessary informatoion and link it to the update page 
  const handleUpdate = () => {
    if (displaying === false){
      alert('select item to update')
    } else if (displaying === true) {
      const data = {userid: modifier, itemname: name, description: description, quantity: quantity, manager: id, name: hello}
      navigate(`UpdateItem`,{state: {id: itemid, userid: modifier, itemname: name, description: description, quantity: quantity, manager: id}})
      console.log(data)
    }
  }

  //this section will handle the deletion of selected files.  if first will veify if an item has been selected and being displayed
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
    };
    window.location.reload();
  }



  
  if (loading){
    return <p>loading</p>
  }
    return (
    <>
      <div className='ManagerheaderBar'>
        { hello === null ? <h2 className='pstyle'> {`Welcome`}</h2> : <h2 className='pstyle'> {`Welcome ${hello}`}</h2> }

      
        <h4 className='pstyle'>Whole Inventory list</h4>
        <button className='linkBtnManager' onClick={() => navigate(`myInventory`, {state: hello})} >{`View My Inventory Items`}</button>

 
      </div>

      <div className='Managerfullcontainer'>
          {inventory.map(item => (
            <div className='singleItemContainer' onClick={() => AllData(item)}>
                <div className='ManageritemHeader'>
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
      {/* the below is using a ternary to see if delete was selected.  if selected it updates the area to ensure managers knows they are applying the delete funciton */}
      <div className='Mlower'>
        <div>
          { deleteItem ? 
                <div className='MdetailareaDelete'>
                    <h1 className='MdetailtitleDelete'>Item Name: {name} </h1>
                    <h3 className='MdetailsOther'>Description: {description} </h3>
                    <p className='MdetailsOther'>Quantity: {quantity}</p>
                    <p className='MdetailsOther'>Updated/Modified By: {modifier}</p>
                    <div>
                      <button className='DeleteItemBtn' onClick={() => {handleDelete()}}>I AM SURE I WANT TO DELETE ITEM</button>
                      <button className='CancelItemBtn' onClick={() => setDeleteItem(false)}>Cancel Delete</button>
                    </div>


                </div>
            :
                <div className='Mdetailarea'>
                    <h1 className='Mdetailtitle'>Item Name: {name} </h1>
                    <h3 className='MdetailsOther'>Description: {description} </h3>
                    <p className='MdetailsOther'>Quantity: {quantity}</p>
                    <p className='MdetailsOther'>Added By: {modifier}</p>
                </div>
            }
        </div>
        <div className='btnGroup'>
            <button className='ABtn' onClick={() => navigate(`addItem`,{ state: id })} >Add Item</button>
            <button className='UBtn' onClick={() => {handleUpdate()}} >Update Item </button>
            <button className='DBtn' onClick={() => setDeleteItem(true)}>Delete Item</button>
        </div>
      </div>
  </>
    
    );
  }
  

  export default Manager;
 

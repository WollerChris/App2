import { useState } from 'react';
import './Manager.css';
import { useEffect} from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom'



function Manager() {
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
    const [deleteItem, setDeleteItem] = useState(false)


    useEffect(() => {
      fetch('http://localhost:8081/items')
        .then((res) => res.json())
        .then(data => {
          setInventory(data)
          setLoading(false)
        })
        .catch(error=>console.log('this isnt working'))
    },[])
  
//   console.log(inventory)
  const lowerCaseHelper = () => {
    let searchItem = document.getElementById("searchInput").value;
    setSearchText(searchItem.toLowerCase())
  }

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
    if (displaying === false){
      alert('select item to update')
    } else if (displaying === true) {
      const data = {userid: modifier, itemname: name, description: description, quantity: quantity, manager: id}
      navigate(`UpdateItem`,{state: {id: itemid, userid: modifier, itemname: name, description: description, quantity: quantity, manager: id}})
      console.log(data)
    }
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
    };
    window.location.reload();
  }



  
  if (loading){
    return <p>loading</p>
  }
    return (
    <>
      <div className='headerBar'>
        <h2 className='pstyle'>{`Welcome`}</h2>
        <h4 className='pstyle'>Whole Inventory list</h4>
        <button className='linkBtn' onClick={() => navigate(`myInventory`, {state: hello})} >{`View My Inventory Items`}</button>

          {/* <div className='searchContainer'id="searchContainer">
              <input className='searchInput' id="searchInput" type="text" name="search" 
                  placeholder="Search for item..." onChange={lowerCaseHelper}>
              </input>
          </div> */}
      </div>

      <div className='fullcontainer'>
        {/* {inventory.filter(item => item.itemname.includes(searchText)) */}
          {inventory.map(item => (
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
      {/* <div> */}
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
                    <p className='MdetailsOther'>Updated/Modified By: {modifier}</p>
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
 

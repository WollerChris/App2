import { useState } from 'react';
import './Manager.css';
import { useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom'



function Manager() {
    const navigate = useNavigate()
    const hello = useLocation().state;
    const [loading, setLoading] = useState(true)
    const [inventory, setInventory] = useState([])
    const [searchText, setSearchText] = useState('')
    const [id, setid] = useState('')
    const [name, setname] = useState('')
    const [description, setdescription] = useState('')
    const [quantity, setquantity] = useState('')


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
    setid(item.id)
    setname(item.itemname)
    setdescription(item.description)
    setquantity(item.quantity)
    console.log(item.itemname)
  }

  
  if (loading){
    return <p>loading</p>
  }
    return (
      <>
      <div className='headerBar'>
      <h2 className='pstyle'>{`Welcome ${hello}`}</h2>
      <h4 className='pstyle'>Inventory list</h4>
        <div className='searchContainer'id="searchContainer">
            <input className='searchInput' id="searchInput" type="text" name="search" 
                placeholder="Search for item..." onChange={lowerCaseHelper}>
            </input>
        </div>
      </div>

      <div className='fullcontainer'>
        {inventory.filter(item => item.itemname.toLowerCase().includes(searchText))
          .map(item => (
            <div className='singleItemContainer' onClick={() => AllData(item)}>
                <div className='itemHeader'>
                  <p className='idstyle'>Item ID: {item.id}</p>
                  <h3>Item Name: {item.itemname}</h3>
                </div>
              <p>Item Description: {item.description.slice(0,100)}...</p>
              <p>Inventory: {item.quantity}</p>
            </div>
          ))
      }
      </div>
      <div className='Mlower'>
        <div className='Mdetailarea'>
            <h1 className='Mdetailtitle'>Item Name: {name} </h1>

            <h3 className='MdetailsOther'>Description: {description} </h3>
            <p className='MdetailsOther'>Quantity: {quantity}</p>
        </div>
        <div className='btnGroup'>
            <button className='ABtn' onClick={() => navigate(`addItem`)} >Add Item</button>
            <button className='UBtn' >Update Item </button>
            <button className='DBtn' >Delete Item</button>
        </div>
      </div>
      </>
    );
  }
//   <button className='LoginBtn' onClick={() => navigate(`addItem`)}>Create Account</button>
//   <button className='LoginBtn' onClick={() => navigate(`updateItem`)}>Create Account</button>
//   <button className='LoginBtn' onClick={() => navigate(`deleteItem`)}>Create Account</button>

  export default Manager;
 

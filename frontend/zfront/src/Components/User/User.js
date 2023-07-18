import { useState } from 'react';
import './User.css';
import { useEffect} from 'react';



function User() {
    const [loading, setLoading] = useState(true)
    const [inventory, setInventory] = useState([])
    const [searchText, setSearchText] = useState('')


    useEffect(() => {
      fetch('http://localhost:8081/items')
        .then((res) => res.json())
        .then(data => {
          setInventory(data)
          setLoading(false)
        })
        .catch(error=>console.log('this isnt working'))
    },[])
  
  console.log(inventory)
  const lowerCaseHelper = () => {
    let searchItem = document.getElementById("searchInput").value;
    setSearchText(searchItem.toLowerCase())
  }
  
  if (loading){
    return <p>loading</p>
  }
    return (
      <>
      <div className='headerBar'>
      <h4 className='pstyle'>Inventory Below</h4>
        <div className='searchContainer'id="searchContainer">
            <input className='searchInput' id="searchInput" type="text" name="search" 
                placeholder="Search for item..." onChange={lowerCaseHelper}>
            </input>
        </div>
      </div>

      <div className='fullcontainer'>
        {inventory.filter(item => item.itemname.toLowerCase().includes(searchText))
          .map(item => (
            <div className='singleItemContainer'>
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
      </>
    );
  }
  

  export default User;
 


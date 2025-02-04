import React, { useEffect, useState } from 'react';
import Axios from "axios";

 


export default function Customer() {
    
  const      [id, setId] = useState();
 
  const      [name, setName] = useState();
  const      [price, setPrice] = useState(); 
  const      [quantity, setQuantity] = useState();
const      [mylist, setMylist] = useState([]);
  
useEffect( () => {
  Axios.get("http://localhost:4200/viewproduct").then(
    res=> setMylist(res.data) )
},[]
)

function onAddCart(e)  {
    e.preventDefault();
    var id = e.target.id;
    //alert(id)
    Axios.get(`http://localhost:4200/addcart/${id}`).then(
     res=> setMylist(res.data)
          )
 
  }; 





  return (
     <div>

  <table > 
<thead>
<th>Image</th><th> ID </th> <th> Name </th> <th> Price </th>
                      <th>Add To Cart</th> 
</thead>
<tbody>
                        {mylist.map((item,index)=>{
                            
                            return(
                                <tr key={index}>

<td> <img src={item.filename} width="100" height="100" /></td>
                            

                                      <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                <td><button
                      variant="success"
                      id={item.id}
                      
                      onClick={onAddCart}
                    >
                      Add To Cart
                    </button>
</td>



                                    </tr>
                            );
                        })}

                        
                    </tbody>
</table>

<a href="viewcart">View Cart</a>
      </div>
      
                
  );
}






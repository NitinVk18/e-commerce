import React, { useEffect, useState } from 'react';
import Axios from "axios";

 


export default function Cart() {
    
 
  const      [quantity, setQuantity] = useState();
const      [mylist, setMylist] = useState([]);
  const [gross,setGross] = useState(0)
useEffect( () => {
  Axios.get("http://localhost:4200/viewcart").then(
    res=>  { setMylist(res.data) ; updateAmount(res.data);
      //console.log(res.data)
})
},[])

function updateAmount (mylist)
  {
     var myTotal = 0;
     for (var i = 0, len = mylist.length; i < len; i++) {
            myTotal += (mylist[i].cart_product[0].price * mylist[i].qty); 
        }
          setGross(myTotal);

          console.log(myTotal)
    localStorage.setItem("gross",myTotal+"");
    localStorage.setItem("cartItems",JSON.stringify(mylist));
   }

function onDelCart(e)  {
    e.preventDefault();
    var id = e.target.id;
    //alert(id)
    Axios.get(`http://localhost:4200/delcart/${id}`).then(
     res=> setMylist(res.data)
          )
 
  }; 





  return (
     <div>

  <table > 
<thead>
<th>Image</th><th> ID </th> <th> Name </th> <th> Price </th>
               <th>Quantity</th>       <th>Delete</th> 
</thead>
<tbody>
                        {mylist.map((item,index)=>{
                            
                            return(
                                <tr key={index}>
      

      <td> <img src={item.cart_product[0].filename} width="100" height="100" /></td>
       
                                      <td>{item.id}</td>

                                      <td>{item.cart_product[0].name}</td>
                                      <td>{item.cart_product[0].price}</td>
                                      <td>{item.qty}</td>
                                 
                                     <td><button
                      
                      id={item.id}
                      
                      onClick={onDelCart}
                    >
                      Delete
                    </button>
</td>



                                    </tr>
                            );
                        })}

                        
                    </tbody>
</table>

<h1> Gross Amount  {gross} </h1>

<a href="payment" >Payment</a>

      </div>
      
                
  );
}






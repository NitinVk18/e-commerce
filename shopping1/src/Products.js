import React, { useEffect, useState } from 'react';
import Axios from "axios";

 
export default function Products() {
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

function handleChange(e)  {
  e.preventDefault();
    
  setId(e.target.value);
};
  function handleChange1(e)  {
    e.preventDefault();
      
    setName(e.target.value);
  };
  function handleChange2(e)  {
    e.preventDefault();
      
    setPrice(e.target.value);
  }; 

  function handleChange3(e)  {
    e.preventDefault();
      
    setQuantity(e.target.value);
  };

  function onDelete(e)  {
    e.preventDefault();
    var id = e.target.id;
    //alert(id)
    Axios.get(`http://localhost:4200/productdelete/${id}`).then(
     res=> setMylist(res.data)
          )
 
  }; 
  function onEdit(e)  {
    e.preventDefault();
    var id = e.target.id;
    //alert(id)
    Axios.get(`http://localhost:4200/updatefind/${id}`).then(
      res=> {
        console.log(res.data)
         setId(res.data[0].id);
         setName(res.data[0].name); setPrice(res.data[0].price);
         setQuantity(res.data[0].quantity);
      } )
  
  }; 



  async function mysubmit() 
    {
  const data={"id":id,"name":name,"price":price,"quantity":quantity};

     const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }

    Axios.post('http://localhost:4200/product_create',data).then(res => console.log(res.data))
   

    
}



async function myupdate() 
{
const data={"id":id,"name":name,"price":price,"quantity":quantity};

Axios.post('http://localhost:4200/productupdate',data).then(res => console.log(res.data))



}
  return (
     <div>
 Product Id
    <input type="text"  value={id}  onChange={handleChange} />
  
   Product Name 
    <input type="text"  value={name}  onChange={handleChange1} />
    Product Price
    <input type="text"   value={price}   onChange={handleChange2} />
    Product quantity
    <input type="text"   value={quantity}  onChange={handleChange3} />
    
  <button variant="primary" type="button" onClick={mysubmit}>
    Submit
  </button>
    
  <button variant="primary" type="button" onClick={myupdate}>
    UPDATE
  </button>
  <table > 
<thead>
<th> ID </th> <th> Name </th> <th> Price </th>
                      <th>Delete</th> <th>Edit</th>
</thead>
<tbody>
                        {mylist.map((item,index)=>{
                            
                            return(
                                <tr key={index}>
                                      <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                <td><button
                      variant="danger"
                      id={item.id}
                      
                      onClick={onDelete}
                    >
                      Delete
                    </button>
</td>



<td><button
                      variant="warning"
                      id={item.id}
                      onClick={onEdit}
                    >
                      Edit
                    </button>
</td>
                                    </tr>
                            );
                        })}

                        
                    </tbody>
</table>


      </div>
      
                
  );
}

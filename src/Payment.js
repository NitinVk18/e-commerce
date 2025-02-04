
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {

  const navigate = useNavigate()

  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");



  const findUser = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) ;
    //setItems(cartItems);
    // console.log(cartItems);
    let x = []
    for (let i=0;i<cartItems.length;i++)
     {
      x.push({"id":cartItems[i].cart_product[0].id,"name":cartItems[i].cart_product[0].name,"price":cartItems[i].cart_product[0].price,"qty":cartItems[i].qty,"filename":cartItems[i].cart_product[0].filename});
     }
     setItems(x);
    //  console.log(x);
  };

  useEffect(() => {
    findUser();
  }, []);

  const handlePayment = async () => {
    const data = {
      "name": name,
      "email": email,
      "amount":localStorage.getItem('gross'),
      "product": items,
    };

    
      const response = await Axios.post('http://localhost:4200/showcart/payment', data);
      console.log('Payment Successful:', response.data);

    alert('payment successful')

    
  };

  const handleGenerateBill = () => {
  
    // Calculate total amount
    const totalAmount = items.reduce(
      (total, item) =>
        total + parseInt(item.productPrice) * parseInt(item.productQuantity),
      0
    );

    // Create bill object
    const bill = {
      customerName: name,
      email: email,
      items,
      totalAmount,
    };

    // Store bill in localStorage
    localStorage.setItem('bill', JSON.stringify(bill));

    alert('Bill generated and stored in localStorage.');
    console.log('Generated Bill:', bill);
    navigate('/showcart/bill')
  };

  return (
    <div style={{ padding: '2vw' }}>
      <h1>Make Payment</h1>
      <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
        <div>
          Customer Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)}     />
        </div>
        <div>
          Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
          Total Amount: <input type="number" value={localStorage.getItem('gross')} readOnly />
        </div>
        <br />
        <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '2vw' }}>
          <button type="submit">Submit Payment</button>
          <button onClick={handleGenerateBill}>Generate Bill</button>
          <button onClick={() => {
            navigate('/customer')
          }}>continue shopping</button>
        </div>
      </form>

      <h2>Cart Products:</h2>

      <table > 
<thead>
<th>Image</th><th> ID </th> <th> Name </th> <th> Price </th>
               <th>Quantity</th>       <th>Delete</th> 
</thead>
<tbody>
                        {items.map((item,index)=>{
                            
                            return(
                                <tr key={index}>
      

      <td> <img src={item.filename} width="100" height="100" /></td>
       
                                      <td>{item.id}</td>

                                      <td>{item.name}</td>
                                      <td>{item.price}</td>
                                      <td>{item.qty}</td>
                              
                                    </tr>
                            );
                        })}

                        
                    </tbody>
</table>


    </div>
  );
};

export default Payment;





// import React, { useState,useEffect } from 'react';
// import Axios from "axios";
// import {useNavigate} from 'react-router-dom';
      
// export default function Payment(props) {
//   const      [customername, setCustomername] = useState('');
//   const      [cardno, setCardno] = useState('');
//   const      [password, setPassword] = useState('');
//   const      [amount, setAmount] = useState('');  
//bla bla
//    function handleChange(e)  {
//     e.preventDefault();
//     setCustomername(e.target.value);
//   }; 
//   function handleChange1(e)  {
//     e.preventDefault();
//     setCardno(e.target.value);
//   };
//   function handleChange2(e)  {
//     e.preventDefault();
//     setPassword(e.target.value);
//   }; 




//   const handlePayment = async () => {
//     const data = {
//       username: userdt.user.username,
//       name: userdt.user.name,
//       email: userdt.user.email,
//       product: userdt.items,
//     };

//     try {
//       const response = await Axios.post('http://localhost:4000/showcart/payment', data);
//       console.log('Payment Successful:', response.data);

//       // Clear cart after successful payment
//       localStorage.removeItem('cartItems'); // Assuming cart is stored in localStorage
//       userdt.items = [];

//       alert('Payment successful! Cart is now empty.');
//     } catch (error) {
//       console.error('Payment Failed:', error.response?.data || error.message);
//       alert(error.response?.data?.error || 'Payment failed. Please try again.');
//     }
//   };


//   function mysubmit() 
//     {
//   const data={"cname":customername,"cardno":cardno,"amount":amount,"products":localStorage.getItem("products")};
// console.log(data);
//   Axios.post("http://localhost:4200/payment",data).then(
// res=> console.log("payment done") );
// setCardno('');
//  setPassword('');
// window.alert("payment done");
   
// }
// useEffect(() => {
//         setAmount(localStorage.getItem("gross"));
//         setCustomername(localStorage.getItem("cname"));
//       },[]);



//   return (
//      <div>
//    <br/>
// Customer Name
//     <input type="text" value={customername} onChange={handleChange} />
    


// Card No
//     <input type="text" value={cardno} onChange={handleChange1}/>
    
  
// Password <input type="password" placeholder="Password" value={password}
// onChange={handleChange2}
//  />
  
  
// Amount
//     <input type="text" placeholder="Amount"
//  value={amount}
         
//  />

 
//   <button type="button" onClick={mysubmit}>
//     Submit
//   </button>


// <a href="/bill">Generate Bill </a>


//       </div>
      
                
//   );
// }

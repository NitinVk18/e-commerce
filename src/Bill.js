import React, { useState } from 'react';
import Axios from "axios";
import {useNavigate} from 'react-router-dom';
    
export default function Bill(props) {
  const [mylist,setList]= useState([]);
  const [gross,setGross] = useState('');
  const [billno,setBillno] = useState('');
  const [billdate,setBilldate]= useState('')
 
  async function mysubmit() 
    {
     const data={"cname":localStorage.getItem("cname")};
  const result = await Axios.post("http://localhost:4200/bill");
  setList(result.data);
  console.log(result.data);
   setBillno(result.data[0].billno);
  setGross(result.data[0].amount);
 
    
 
}




 return (
     <div>
   <br/><br/><br/>
 

  <button type="button" onClick={mysubmit}>
    Generate Bill
  </button>

  <table>
<thead>
<tr>
<th colSpan="4">
<h1 align="center">INVOICE</h1>
  <h3 align="center">Oops Info Solutions Pvt Ltd</h3>
  <h3 align="center">Chandigarh,Sector-34A</h3>
  <h3 align="center">Phone:0172-5009244</h3>
<hr></hr>
  <h4>Invoice No:  {billno}           Invoice Date: {new Date().toDateString()}</h4>

  Customer Name : Raman <br/>
  Shipment Address : #121
</th>
</tr>
<tr>
 <th> Particulars</th><th> Price </th><th>Quantity</th> <th>Amount</th> 

</tr>
</thead>
<tbody>
              {mylist.map((item, index) => {
              console.log(item);
              return (
                <tr key={index}>
                       
                  
                  <td>{item.product_name}</td>
                  <td>{item.product_price}</td>
                  <td>{item.purchase_qty}</td>
                  <td>{item.product_price * item.purchase_qty}</td>
                
                        
                </tr>
              );
            })}
           <tr>
            <td colSpan="4" align="right"><h6>Gross Payable Amount {gross} </h6></td> </tr>
           
          </tbody>

      
</table>

      </div>
      
                
  );
}

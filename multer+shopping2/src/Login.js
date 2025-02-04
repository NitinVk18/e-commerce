import React, { useState } from 'react';
import Axios from "axios";
//import {useNavigate} from 'react-router-dom';
     
export default function Login(props) {
  const      [username, setUserName] = useState('');
  const      [password, setPassword] = useState(''); 
 //const navigate = useNavigate();
   
  function handleChange1(e)  {
    e.preventDefault();
      
    setUserName(e.target.value);
  };
  function handleChange2(e)  {
    e.preventDefault();
      
    setPassword(e.target.value);
  }; 
  async function mysubmit() 
    {
  const data={"username":username,"password":password};

     const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    const response = await fetch('http://localhost:4200/login', config)    
    const json = await response.json();
 

console.log(json);
if(json.length==0)
  {
   console.log("invalid user try again");
     
    }
else if(json[0].type=="admin")
 { console.log("welcome admin");
     // navigate("/admin");
  }
else if(json[0].type=="customer")
 { console.log("customer ");
    localStorage.setItem("cname",username);
     //navigate("/customer");
  }


    
}
  return (
     <div>
  
Username
    <input type="text" placeholder="Enter Username"  value={username} onChange={handleChange1} />
Password
 <input type="text" placeholder="Enter Password"  value={password} onChange={handleChange2} />
    
  <button variant="primary" type="button" onClick={mysubmit}>
    Submit
  </button>






      </div>
      
                
  );
}

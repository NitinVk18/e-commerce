import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4'
  };

  const inputStyle = {
    margin: '10px',
    padding: '10px',
    width: '250px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px'
  };

  async function mysubmit() {
    const data = { username, password };
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    };

    const response = await fetch('http://localhost:4200/login', config);
    const json = await response.json();

    console.log(json);
    if (json.length === 0) {
      console.log('Invalid user, try again');
    } else if (json[0].type === 'admin') {
      console.log('Welcome admin');
      navigate('/admin');
    } else if (json[0].type === 'customer') {
      console.log('Welcome customer');
      localStorage.setItem('cname', username);
      navigate('/customer');
    }
  }

  return (
    <div style={containerStyle}>
      <h2>Login</h2>
      <input 
        type="text" 
        placeholder="Enter Username" 
        value={username} 
        onChange={(e) => setUserName(e.target.value)} 
        style={inputStyle} 
      />
      <input 
        type="password" 
        placeholder="Enter Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        style={inputStyle} 
      />
      <button style={buttonStyle} onClick={mysubmit}>Submit</button>
    </div>
  );
}

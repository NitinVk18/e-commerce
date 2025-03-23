import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <input 
          type="text" 
          placeholder="Enter Username" 
          value={username} 
          onChange={(e) => setUserName(e.target.value)} 
          className="w-full p-2 mb-3 border border-gray-300 rounded-md"
        />
        <input 
          type="password" 
          placeholder="Enter Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-2 mb-3 border border-gray-300 rounded-md"
        />
        <button 
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          onClick={mysubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

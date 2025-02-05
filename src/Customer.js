import React, { useEffect, useState } from 'react';
import Axios from "axios";

export default function Customer() {
  const [mylist, setMylist] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:4200/viewproduct").then(res => setMylist(res.data));
  }, []);

  function onAddCart(e) {
    e.preventDefault();
    Axios.get(`http://localhost:4200/addcart/${e.target.id}`).then(res => setMylist(res.data));
  }

  const containerStyle = {
    padding: '24px',
    backgroundColor: '#f3f4f6',
    minHeight: '100vh'
  };

  const tableContainerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #ccc'
  };

  const thTdStyle = {
    padding: '8px',
    border: '1px solid #ccc',
    textAlign: 'center'
  };

  const buttonStyle = {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none',
    marginTop: '10px'
  };

  const linkStyle = {
    display: 'inline-block',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '6px',
    textDecoration: 'none',
    marginTop: '16px',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <div style={tableContainerStyle}>
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '16px' }}>Product List</h1>
        <table style={tableStyle}>
          <thead>
            <tr style={{ backgroundColor: '#e5e7eb' }}>
              <th style={thTdStyle}>Image</th>
              <th style={thTdStyle}>ID</th>
              <th style={thTdStyle}>Name</th>
              <th style={thTdStyle}>Price</th>
              <th style={thTdStyle}>Add To Cart</th>
            </tr>
          </thead>
          <tbody>
            {mylist.map((item, index) => (
              <tr key={index}>
                <td style={thTdStyle}>
                  <img src={item.filename} alt="Product" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                </td>
                <td style={thTdStyle}>{item.id}</td>
                <td style={thTdStyle}>{item.name}</td>
                <td style={thTdStyle}>${item.price}</td>
                <td style={thTdStyle}>
                  <button id={item.id} onClick={onAddCart} style={buttonStyle}>Add To Cart</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <a href="viewcart" style={linkStyle}>View Cart</a>
        </div>
      </div>
    </div>
  );
}

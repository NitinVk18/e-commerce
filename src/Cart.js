import React, { useEffect, useState } from 'react';
import Axios from "axios";

export default function Cart() {
  const [mylist, setMylist] = useState([]);
  const [gross, setGross] = useState(0);

  useEffect(() => {
    Axios.get("http://localhost:4200/viewcart").then(res => {
      setMylist(res.data);
      updateAmount(res.data);
    });
  }, []);

  function updateAmount(mylist) {
    let myTotal = mylist.reduce((acc, item) => acc + item.cart_product[0].price * item.qty, 0);
    setGross(myTotal);
    localStorage.setItem("gross", myTotal);
    localStorage.setItem("cartItems", JSON.stringify(mylist));
  }

  function onDelCart(e) {
    e.preventDefault();
    Axios.get(`http://localhost:4200/delcart/${e.target.id}`).then(res => setMylist(res.data));
  }

  return (
    <div style={{ padding: '24px', backgroundColor: '#f7fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: 'auto', backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', color: '#2d3748', marginBottom: '16px' }}>Shopping Cart</h1>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <thead>
            <tr style={{ backgroundColor: '#edf2f7' }}>
              <th style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Image</th>
              <th style={{ padding: '12px', border: '1px solid #e2e8f0' }}>ID</th>
              <th style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Name</th>
              <th style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Price</th>
              <th style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Quantity</th>
              <th style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {mylist.map((item, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f7fafc', transition: '0.3s' }}>
                <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>
                  <img src={item.cart_product[0].filename} alt="Product" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                </td>
                <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>{item.id}</td>
                <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>{item.cart_product[0].name}</td>
                <td style={{ padding: '12px', border: '1px solid #e2e8f0', fontWeight: 'bold', color: '#2c5282' }}>${item.cart_product[0].price}</td>
                <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>{item.qty}</td>
                <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>
                  <button
                    id={item.id}
                    onClick={onDelCart}
                    style={{ backgroundColor: '#e53e3e', color: '#ffffff', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', border: 'none', fontWeight: 'bold', transition: '0.3s' }}
                    onMouseOver={e => e.target.style.backgroundColor = '#c53030'}
                    onMouseOut={e => e.target.style.backgroundColor = '#e53e3e'}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748', marginTop: '20px' }}>Gross Amount: ${gross}</h2>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <a href="payment" style={{ backgroundColor: '#3182ce', color: '#ffffff', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', transition: '0.3s' }}
            onMouseOver={e => e.target.style.backgroundColor = '#2b6cb0'}
            onMouseOut={e => e.target.style.backgroundColor = '#3182ce'}>
            Proceed to Payment
          </a>
        </div>
      </div>
    </div>
  );
}
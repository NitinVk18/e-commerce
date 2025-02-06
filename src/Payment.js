import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let formattedItems = cartItems.map(item => ({
      id: item.cart_product[0].id,
      name: item.cart_product[0].name,
      price: item.cart_product[0].price,
      qty: item.qty,
      filename: item.cart_product[0].filename
    }));
    setItems(formattedItems);
  }, []);

  const handlePayment = async () => {
    const data = {
      name,
      email,
      amount: localStorage.getItem('gross'),
      product: items
    };
    try {
      const response = await Axios.post('http://localhost:4200/showcart/payment', data);
      alert('Payment successful!');
    } catch (error) {
      alert('Payment failed. Please try again.');
    }
  };

  const handleGenerateBill = () => {
    const totalAmount = items.reduce((total, item) => total + item.price * item.qty, 0);
    const bill = { customerName: name, email, items, totalAmount };
    localStorage.setItem('bill', JSON.stringify(bill));
    alert('Bill generated successfully!');
    navigate('/showcart/bill');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to right, #6a11cb, #2575fc)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', width: '100%', background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }}>
        <h1 style={{ textAlign: 'center', color: '#333', fontSize: '2rem', marginBottom: '1rem' }}>Make Payment</h1>
        
        <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
          <input type="text" placeholder="Customer Name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #ccc' }} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #ccc' }} required />
          <input type="number" value={localStorage.getItem('gross')} readOnly style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#f5f5f5', border: 'none', textAlign: 'center', marginBottom: '1rem' }} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="submit" style={{ padding: '10px 20px', background: '#28a745', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer', transition: '0.3s' }}>Submit Payment</button>
            <button type="button" onClick={handleGenerateBill} style={{ padding: '10px 20px', background: '#007bff', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer', transition: '0.3s' }}>Generate Bill</button>
            <button type="button" onClick={() => navigate('/customer')} style={{ padding: '10px 20px', background: '#ffc107', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer', transition: '0.3s' }}>Continue Shopping</button>
          </div>
        </form>

        <h2 style={{ marginTop: '2rem', color: '#333', fontSize: '1.5rem' }}>Cart Products:</h2>
        <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#eee' }}>
            <tr>
              <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Image</th>
              <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>ID</th>
              <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Name</th>
              <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Price</th>
              <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Qty</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} style={{ textAlign: 'center', background: index % 2 === 0 ? '#fafafa' : '#fff' }}>
                <td style={{ padding: '10px' }}><img src={item.filename} alt="Product" style={{ width: '50px', height: '50px', borderRadius: '8px' }} /></td>
                <td style={{ padding: '10px' }}>{item.id}</td>
                <td style={{ padding: '10px' }}>{item.name}</td>
                <td style={{ padding: '10px' }}>${item.price.toFixed(2)}</td>
                <td style={{ padding: '10px' }}>{item.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payment;

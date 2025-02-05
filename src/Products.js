import React, { useEffect, useState } from 'react';
import Axios from 'axios';

export default function Products() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [file, setFile] = useState(null);
  const [mylist, setMylist] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:4200/viewproduct').then((res) => setMylist(res.data));
  }, []);

  const handleChange = (e) => setId(e.target.value);
  const handleChange1 = (e) => setName(e.target.value);
  const handleChange2 = (e) => setPrice(e.target.value);
  const handleChange3 = (e) => setQuantity(e.target.value);
  const handleChange4 = (e) => setFile(e.target.files[0]);

  const onDelete = (e) => {
    const id = e.target.id;
    Axios.get(`http://localhost:4200/productdelete/${id}`).then((res) => setMylist(res.data));
  };

  const onEdit = (e) => {
    const id = e.target.id;
    Axios.get(`http://localhost:4200/updatefind/${id}`).then((res) => {
      setId(res.data[0].id);
      setName(res.data[0].name);
      setPrice(res.data[0].price);
      setQuantity(res.data[0].quantity);
    });
  };

  const mysubmit = async () => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('file', file);

    Axios.post('http://localhost:4200/product_create', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    }).then((res) => console.log(res.data));
  };

  const myupdate = async () => {
    const data = { id, name, price, quantity };
    Axios.post('http://localhost:4200/productupdate', data).then((res) => console.log(res.data));
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(to right, #007BFF, #00A5FF)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      textAlign: 'center',
    },
    card: {
      maxWidth: '800px',
      width: '100%',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#007BFF',
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
    },
    button: {
      padding: '10px 20px',
      margin: '10px',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
    },
    submitButton: {
      backgroundColor: '#28a745',
      color: 'white',
    },
    updateButton: {
      backgroundColor: '#007BFF',
      color: 'white',
    },
    deleteButton: {
      backgroundColor: '#dc3545',
      color: 'white',
    },
    editButton: {
      backgroundColor: '#ffc107',
      color: 'black',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
    },
    th: {
      backgroundColor: '#007BFF',
      color: 'white',
      padding: '10px',
      textAlign: 'left',
    },
    td: {
      padding: '10px',
      border: '1px solid #ddd',
    },
    image: {
      width: '100px',
      height: '100px',
      objectFit: 'cover',
      borderRadius: '8px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Product Management</h1>

        {/* Form */}
        <form>
          <input type="text" placeholder="Product ID" value={id} onChange={handleChange} style={styles.input} />
          <input type="text" placeholder="Product Name" value={name} onChange={handleChange1} style={styles.input} />
          <input type="number" placeholder="Product Price" value={price} onChange={handleChange2} style={styles.input} />
          <input type="number" placeholder="Product Quantity" value={quantity} onChange={handleChange3} style={styles.input} />
          <input type="file" onChange={handleChange4} style={styles.input} />

          <button type="button" onClick={mysubmit} style={{ ...styles.button, ...styles.submitButton }}>Submit</button>
          <button type="button" onClick={myupdate} style={{ ...styles.button, ...styles.updateButton }}>Update</button>
        </form>

        {/* Product Table */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mylist.map((item, index) => (
              <tr key={index}>
                <td style={styles.td}><img src={item.filename} alt="Product" style={styles.image} /></td>
                <td style={styles.td}>{item.id}</td>
                <td style={styles.td}>{item.name}</td>
                <td style={styles.td}>${item.price.toFixed(2)}</td>
                <td style={styles.td}>
                  <button id={item.id} onClick={onDelete} style={{ ...styles.button, ...styles.deleteButton }}>Delete</button>
                  <button id={item.id} onClick={onEdit} style={{ ...styles.button, ...styles.editButton }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

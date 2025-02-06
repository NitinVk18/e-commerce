import React, { useEffect, useState } from 'react';

const AdminBills = () => {
    const [bills, setBills] = useState([]);

    useEffect(() => {
        // Fetch bills from the server
        const fetchBills = async () => {
            try {
                const response = await fetch('http://localhost:4200/admin/viewbills'); // Adjust the URL if needed
                const data = await response.json();
                setBills(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBills();
    }, []);

    return (
        <div
            style={{
                padding: '20px',
                fontFamily: 'Arial, sans-serif',
                backgroundColor: '#f9f9f9',
                minHeight: '100vh',
            }}
        >
            <h1
                style={{
                    textAlign: 'center',
                    color: '#333',
                    fontSize: '2.5rem',
                    marginBottom: '20px',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                }}
            >
                All Bills
            </h1>
            <table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    backgroundColor: '#fff',
                }}
            >
                <thead>
                    <tr
                        style={{
                            backgroundColor: '#007BFF',
                            color: '#fff',
                        }}
                    >
                        <th style={{ padding: '15px', textAlign: 'left' }}>Bill No</th>
                        <th style={{ padding: '15px', textAlign: 'left' }}>Username</th>
                        <th style={{ padding: '15px', textAlign: 'left' }}>Name</th>
                        <th style={{ padding: '15px', textAlign: 'left' }}>Email</th>
                        <th style={{ padding: '15px', textAlign: 'left' }}>Total Amount</th>
                        <th style={{ padding: '15px', textAlign: 'left' }}>Products</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map((bill) => (
                        <tr
                            key={bill.billno}
                            style={{
                                borderBottom: '1px solid #ddd',
                                transition: 'background-color 0.3s ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f1f1')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
                        >
                            <td style={{ padding: '15px', color: '#555' }}>{bill.billno}</td>
                            <td style={{ padding: '15px', color: '#555' }}>{bill.name}</td>
                            <td style={{ padding: '15px', color: '#555' }}>{bill.email}</td>
                            <td style={{ padding: '15px', color: '#555' }}>${bill.amount}</td>
                            <td style={{ padding: '15px', color: '#555' }}>${bill.totalAmount}</td>
                            <td style={{ padding: '15px', color: '#555' }}>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {bill.products.map((product, index) => (
                                        <li
                                            key={index}
                                            style={{
                                                marginBottom: '10px',
                                                padding: '10px',
                                                backgroundColor: '#f8f9fa',
                                                borderRadius: '5px',
                                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                            }}
                                        >
                                            <strong>{product.productName}</strong> - Qty: {product.productQuantity}, Price: ${product.productPrice}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Example Buttons */}
            <div
                style={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10px',
                }}
            >
                <button
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#28a745',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
                >
                    Export to CSV
                </button>
                <button
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#dc3545',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#c82333')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#dc3545')}
                >
                    Delete All Bills
                </button>
            </div>
        </div>
    );
};

export default AdminBills;
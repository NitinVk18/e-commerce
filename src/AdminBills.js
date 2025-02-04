 import React from 'react'
 import { useEffect, useState } from 'react';
 
 const AdminBills = () => {

    const [bills, setBills] = useState([])

    
    useEffect(() => {
        // Fetch bills from the server
        const fetchBills = async () => {
            try {
                const response = await fetch('http://localhost:4200/admin/viewbills'); // Adjust the URL if needed
                const data = await response.json();
                setBills(data);
                // setLoading(false);
            } catch (error) {
                console.log(error);
                // setError(err.message);
                // setLoading(false);
            }
        };
        fetchBills();
    }, []);
   return (
    <div className="admin-bills">
            <h1>All Bills</h1>
            <table className="bills-table">
                <thead>
                    <tr>
                        <th>Bill No</th>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Total Amount</th>
                        <th>Products</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map((bill) => (
                        <tr key={bill.billno}>
                            <td>{bill.billno}</td>
                            <td>{bill.name}</td>
                            <td>{bill.email}</td>
                            <td>{bill.amount}</td>
                            <td>{bill.totalAmount}</td>
                            <td>
                                <ul>
                                    {bill.products.map((product, index) => (
                                        <li key={index}>
                                            {product.productName} - Qty: {product.productQuantity}, Price: {product.productPrice}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
   
 
 export default AdminBills
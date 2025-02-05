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
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">Shopping Cart</h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Image</th>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {mylist.map((item, index) => (
              <tr key={index} className="text-center border-b">
                <td className="p-2 border">
                  <img src={item.cart_product[0].filename} alt="Product" className="w-20 h-20 object-cover mx-auto" />
                </td>
                <td className="p-2 border">{item.id}</td>
                <td className="p-2 border">{item.cart_product[0].name}</td>
                <td className="p-2 border">${item.cart_product[0].price}</td>
                <td className="p-2 border">{item.qty}</td>
                <td className="p-2 border">
                  <button
                    id={item.id}
                    onClick={onDelCart}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="text-xl font-semibold text-gray-800 mt-6">Gross Amount: ${gross}</h2>
        <div className="mt-4 text-center">
          <a href="payment" className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700">Proceed to Payment</a>
        </div>
      </div>
    </div>
  );
}

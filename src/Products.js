import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function Products() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [file, setFile] = useState(null);
  const [mylist, setMylist] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:4200/viewproduct")
      .then((res) => setMylist(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleChange = (e) => setId(e.target.value);
  const handleChange1 = (e) => setName(e.target.value);
  const handleChange2 = (e) => setPrice(e.target.value);
  const handleChange3 = (e) => setQuantity(e.target.value);
  const handleChange4 = (e) => setFile(e.target.files[0]);

  const onDelete = (id) => {
    Axios.get(`http://localhost:4200/productdelete/${id}`)
      .then((res) => setMylist(res.data))
      .catch((err) => console.error("Error deleting product:", err));
  };

  const onEdit = (id) => {
    Axios.get(`http://localhost:4200/updatefind/${id}`)
      .then((res) => {
        setId(res.data[0]?.id || "");
        setName(res.data[0]?.name || "");
        setPrice(res.data[0]?.price || "");
        setQuantity(res.data[0]?.quantity || "");
      })
      .catch((err) => console.error("Error fetching product:", err));
  };

  const mysubmit = async () => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("file", file);

    Axios.post("http://localhost:4200/product_create", formData, {
      headers: { "content-type": "multipart/form-data" },
    })
      .then((res) => {
        console.log(res.data);
        setMylist([...mylist, res.data]);
      })
      .catch((err) => console.error("Error adding product:", err));
  };

  const myupdate = async () => {
    const data = { id, name, price, quantity };
    Axios.post("http://localhost:4200/productupdate", data)
      .then((res) => console.log(res.data))
      .catch((err) => console.error("Error updating product:", err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-400 p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Product Management
        </h1>

        {/* Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Product ID"
            value={id}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg text-lg"
          />
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={handleChange1}
            className="w-full px-4 py-2 border rounded-lg text-lg"
          />
          <input
            type="number"
            placeholder="Product Price"
            value={price}
            onChange={handleChange2}
            className="w-full px-4 py-2 border rounded-lg text-lg"
          />
          <input
            type="number"
            placeholder="Product Quantity"
            value={quantity}
            onChange={handleChange3}
            className="w-full px-4 py-2 border rounded-lg text-lg"
          />
          <input
            type="file"
            onChange={handleChange4}
            className="w-full px-4 py-2 border rounded-lg text-lg"
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={mysubmit}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={myupdate}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>

        {/* Product Table */}
        <div className="mt-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-2">Image</th>
                <th className="p-2">ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Price</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mylist.map((item, index) => (
                <tr key={index} className="border border-gray-300">
                  <td className="p-2 text-center">
                    <img
                      src={item.filename || "https://via.placeholder.com/100"}
                      alt="Product"
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-2">{item.id}</td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">
                    ${item.price ? item.price.toFixed(2) : "0.00"}
                  </td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => onDelete(item.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => onEdit(item.id)}
                      className="px-3 py-1 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {mylist.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    No products available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

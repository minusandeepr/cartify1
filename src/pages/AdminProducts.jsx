import React, { useEffect, useState } from "react";
import axios from "../utils/api"; 
import { Link } from "react-router-dom";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const { data } = await axios.get("/admin/products");
      setProducts(data);
    } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id) {
    if (!confirm("Delete?")) return;
    await axios.delete(`/admin/products/${id}`);
    load();
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products (admin)</h1>
        <Link to="/admin/products/new" className="btn">Create product</Link>
      </div>

      {loading ? <p>Loading...</p> :
        products.length === 0 ? <p>No products</p> :
        <div className="grid grid-cols-2 gap-4 mt-6">
          {products.map(p => (
            <div key={p._id} className="p-4 border rounded">
              <h3 className="font-semibold">{p.name}</h3>
              <p>₹{p.price}</p>
              <div className="mt-2 space-x-2">
                <Link to={`/admin/products/${p._id}/edit`} className="btn">Edit</Link>
                <button onClick={() => handleDelete(p._id)} className="btn-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
}

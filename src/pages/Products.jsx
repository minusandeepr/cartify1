// src/pages/Products.jsx
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import api from "../api/axios";  

export default function Products(){
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await api.get("/products");
        setProducts(res.data.items || res.data); 
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    }

    loadProducts();
  }, []);

 return (
  <div className="min-h-[calc(100vh-80px)] bg-slate-50">
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Products</h1>
          <p className="text-sm text-slate-500">
            Browse our latest items and add them to your cart.
          </p>
        </div>
        <span className="text-xs rounded-full bg-violet-100 text-violet-700 px-3 py-1">
          {products.length} item{products.length !== 1 && "s"} available
        </span>
      </div>

      {products.length === 0 ? (
        <div className="border border-dashed border-slate-300 rounded-xl bg-white p-10 text-center text-slate-500">
          No products found. Try adding some in MongoDB Compass.
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  </div>
);

}

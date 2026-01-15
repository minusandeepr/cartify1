import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios"; 
import { useDispatch } from "react-redux";
import { addToCartServer } from "../features/cart/cartSlice";


const getProductImageUrl = (product) => {
  if (!product) return null;
  if (product.image) return product.image;
  if (Array.isArray(product.images) && product.images.length > 0) {
    return product.images[product.images.length - 1].url;
  }
  return null;
};

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    const loadProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/products/${id}`);
        if (!ignore) {
          setProduct(res.data);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err.response?.data?.message || err.message || "Failed to load product"
          );
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadProduct();
    return () => {
      ignore = true;
    };
  }, [id]);

  const handleAddToCart = async () => {
    if (!product?._id) return;

    try {
      await dispatch(addToCartServer(product._id)).unwrap();
    } catch (err) {
      console.error("addToCartServer failed", err);
      alert(err || "Failed to add to cart");
    }
  };

  if (loading) {
    return <div className="p-8">Loading product…</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  if (!product) {
    return <div className="p-8">Product not found</div>;
  }

  const imageUrl = getProductImageUrl(product);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="h-80 rounded-3xl bg-slate-100 overflow-hidden flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm text-gray-400">No Image</span>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="mb-6">
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
              Price
            </p>
            <p className="text-3xl font-bold text-indigo-600">
              ₹{product.price?.toFixed ? product.price.toFixed(2) : product.price}
            </p>
            {typeof product.stock === "number" && (
              <p className="mt-2 text-sm text-emerald-700">
                In stock: {product.stock}
              </p>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="inline-flex justify-center items-center px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

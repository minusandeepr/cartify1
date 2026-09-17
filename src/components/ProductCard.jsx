import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { addToCartServer } from "../features/cart/cartSlice";
import { toggleWishlistItem } from "../features/wishlist/wishlistSlice";
import { toast } from "react-toastify";

const getProductImageUrl = (product) => {
  if (!product?.images?.length) return null;

  const url = product.images[0].url;

  // If already absolute, return as is
  if (url.startsWith("http")) return url;

  // Otherwise prefix backend URL
  return `${import.meta.env.VITE_API_URL}${url}`;
};

export default function ProductCard({ product }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const productId = product?._id || product?.id;
  const imageUrl = getProductImageUrl(product);

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    if (!user) {
      navigate("/auth/login");
      return;
    }

    if (!productId) return;

    try {
      await dispatch(addToCartServer(productId)).unwrap();

      alert(t("product.addToCartSuccess", "Added to cart"));
    } catch (err) {
      console.error("addToCartServer failed", err);

      alert(
        err?.message ||
          t("product.addToCartFail", "Failed to add to cart")
      );
    }
  };

  const handleOpenDetail = () => {
    if (productId) {
      navigate(`/products/${productId}`);
    }
  };

  const handleWishlist = (e) => {
    e.stopPropagation();

    if (!user) {
      navigate("/auth/login");
      return;
    }

    dispatch(toggleWishlistItem(productId))
      .unwrap()
      .then(() => {
        toast.success("Added to wishlist ❤️");
      })
      .catch(() => {
        toast.error("Wishlist update failed");
      });
  };

  return (
    <article className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">

      {/* ================= PRODUCT IMAGE ================= */}
      <div
        className="relative h-56 bg-gray-50 overflow-hidden cursor-pointer"
        onClick={handleOpenDetail}
      >
        {/* Wishlist */}
        <button
          type="button"
          title="Add to wishlist"
          onClick={handleWishlist}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm shadow-md flex items-center justify-center text-lg hover:scale-110 hover:bg-white transition-all duration-200"
        >
          ❤️
        </button>

        {/* Product image */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product?.name || "Product"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-sm text-gray-400">
              {t("product.noImage", "No Image")}
            </span>
          </div>
        )}

        {/* Image bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
      </div>

      {/* ================= PRODUCT DETAILS ================= */}
      <div className="p-5 flex flex-col flex-1">

        {/* Product name */}
        <h3
          onClick={handleOpenDetail}
          className="text-lg font-bold text-gray-900 line-clamp-1 cursor-pointer hover:text-purple-600 transition-colors"
        >
          {product?.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-2 mt-2 min-h-[40px]">
          {product?.description || "Quality product selected for you."}
        </p>

        {/* Price + stock */}
        <div className="flex items-end justify-between gap-3 mt-5">

          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
              {t("product.price", "Price")}
            </p>

            <p className="text-xl font-extrabold text-purple-600 mt-1">
              ₹
              {product?.price?.toFixed
                ? product.price.toFixed(2)
                : product?.price}
            </p>
          </div>

          {typeof product?.stock === "number" && (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 whitespace-nowrap">
              {product.stock} in stock
            </span>
          )}
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          type="button"
          className="mt-5 w-full inline-flex justify-center items-center gap-2 px-4 py-3 rounded-xl bg-purple-600 text-white text-sm font-semibold shadow-sm hover:bg-purple-700 hover:shadow-md transition-all duration-200"
        >
          <span>🛒</span>
          {t("product.addToCart", "Add to cart")}
        </button>

      </div>
    </article>
  );
}
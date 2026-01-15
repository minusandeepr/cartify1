import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { addToCartServer } from "../features/cart/cartSlice";
import { toggleWishlistItem } from "../features/wishlist/wishlistSlice";
import { toast } from "react-toastify";

const getProductImageUrl = (product) => {
  if (!product) return null;
  if (product.image) return product.image;
  if (Array.isArray(product.images) && product.images.length > 0) {
    return product.images[product.images.length - 1].url;
  }
  return null;
};

export default function ProductCard({ product }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  AUTH STATE
  const user = useSelector((state) => state.auth.user);

  const productId = product?._id || product?.id;
  const imageUrl = getProductImageUrl(product);

  const handleAddToCart = async () => {
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
    if (productId) navigate(`/products/${productId}`);
  };

  // ❤️ WISHLIST HANDLER 
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition p-6 flex flex-col">
      {/* CARD BODY (clickable) */}
      <div
        className="flex-1 flex flex-col cursor-pointer"
        onClick={handleOpenDetail}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === "Enter") handleOpenDetail();
        }}
      >
        {/* IMAGE + WISHLIST */}
        <div className="relative h-36 mb-4 rounded-xl bg-slate-100 overflow-hidden flex items-center justify-center">
          {/* ❤️ Wishlist Button */}
          <button
            type="button"
            title="Add to wishlist"
            onClick={handleWishlist}
            className="absolute top-2 right-2 z-10 text-red-500 text-xl hover:scale-110 transition"
          >
            ❤️
          </button>

          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product?.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs text-gray-400">
              {t("product.noImage", "No Image")}
            </span>
          )}
        </div>

        {/* PRODUCT INFO */}
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {product?.name}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2 mb-3">
          {product?.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              {t("product.price", "Price")}
            </p>
            <p className="text-lg font-bold text-indigo-600">
              ₹
              {product?.price?.toFixed
                ? product.price.toFixed(2)
                : product?.price}
            </p>
          </div>

          {typeof product?.stock === "number" && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
              {t("product.inStock", { count: product.stock })}
            </span>
          )}
        </div>
      </div>

      {/* ADD TO CART */}
      <button
        onClick={handleAddToCart}
        type="button"
        className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none"
      >
        {t("product.addToCart", "Add to cart")}
      </button>
    </div>
  );
}

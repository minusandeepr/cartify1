import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWishlist,
  removeWishlistItem,
} from "../features/wishlist/wishlistSlice";
import { addToCartServer } from "../features/cart/cartSlice";

export default function Wishlist() {
  const dispatch = useDispatch();

  const { products = [] } = useSelector(
    (state) => state.wishlist || {}
  );

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  if (products.length === 0) {
    return <p className="p-8">Your wishlist is empty</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Wishlist</h1>

      {products.map((product) => (
        <div
          key={product._id}
          className="flex items-center justify-between border rounded-lg p-4 mb-4"
        >
      
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
              {product.images?.length > 0 ? (
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-400">No Img</span>
              )}
            </div>

            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-gray-500">₹{product.price}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                dispatch(addToCartServer(product._id));
                dispatch(removeWishlistItem(product._id));
              }}
              className="bg-indigo-600 text-white px-3 py-1 rounded"
            >
              Add to cart
            </button>

            <button
              onClick={() => dispatch(removeWishlistItem(product._id))}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

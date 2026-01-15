import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCartFromServer,
  updateCartItemOnServer,
  removeItemFromServer,
  clearCartOnServer,
} from "../features/cart/cartSlice";
import { apiCreateOrder } from "../api/orders";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items = [], loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartFromServer());
  }, [dispatch]);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
  if (items.length === 0) {
    alert("Your cart is empty");
    return;
  }

  try {
    await apiCreateOrder({
      items,
      totalAmount: totalPrice,
    });

    dispatch(clearCartOnServer());
    navigate("/orders");
  } catch (err) {
    console.error("Place order failed:", err);
    alert("Failed to place order");
  }
};


  if (loading) {
    return <p className="text-center mt-10">Loading cart...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6">Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between border rounded-lg p-4 mb-4"
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                {/* IMAGE */}
                <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                      No Img
                    </div>
                  )}
                </div>

                {/* INFO */}
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500">₹{item.price}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="border px-2"
                      disabled={item.quantity <= 1}
                      onClick={() =>
                        dispatch(
                          updateCartItemOnServer({
                            productId: item.productId,
                            quantity: item.quantity - 1,
                          })
                        )
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      className="border px-2"
                      onClick={() =>
                        dispatch(
                          updateCartItemOnServer({
                            productId: item.productId,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="text-right">
                <p className="font-semibold">
                  ₹{item.price * item.quantity}
                </p>
                <button
                  className="text-red-500 text-sm mt-1"
                  onClick={() =>
                    dispatch(removeItemFromServer(item.productId))
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* FOOTER */}
          <div className="flex justify-between items-center mt-8">
            <button
              className="text-sm underline"
              onClick={() => dispatch(clearCartOnServer())}
            >
              Clear cart
            </button>

            <div className="text-right">
              <p className="text-xl font-semibold text-blue-600">
                ₹{totalPrice.toFixed(2)}
              </p>
              <button
                onClick={handlePlaceOrder}
                className="bg-green-600 text-white px-6 py-2 rounded mt-2"
              >
                Place Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

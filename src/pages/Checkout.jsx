import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Checkout = () => {
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleConfirmOrder = async () => {
  if (!user?.shippingAddress) {
    alert("Please update your shipping address first.");
    return;
  }

  try {
    await api.post("/orders", {
      shippingAddress: user.shippingAddress,
    });

    alert("Order created successfully");
    navigate("/orders");

  } catch (err) {
    console.error("Order creation failed:", err);
    alert("Failed to place order");
  }
};

/*const handleConfirmOrder = async () => {
  try {
    const res = await api.post(
      "/orders",
      {
        shippingAddress: user.shippingAddress,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    toast.success("Order created successfully");
    navigate("/orders");
  } catch (err) {
    console.error("Order creation failed:", err);
    toast.error("Failed to place order");
  }
};*/



  if (!items || items.length === 0) {
    return <p className="text-center mt-10">Cart is empty</p>;
  }

 /* return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      <div className="border p-4 rounded-lg mb-6">
  <h3 className="font-semibold mb-2">Shipping Address</h3>

  {user?.shippingAddress ? (
    <>
      <p>{user.shippingAddress.fullName}</p>
      <p>{user.email}</p>
      <p>{user.shippingAddress.phone}</p>

      <p>
        {user.shippingAddress.addressLine1}
        {user.shippingAddress.addressLine2 &&
          `, ${user.shippingAddress.addressLine2}`}
      </p>

      <p>
        {user.shippingAddress.city}, {user.shippingAddress.state}
      </p>

      <p>{user.shippingAddress.postalCode}</p>
      <p>{user.shippingAddress.country}</p>
    </>
  ) : (
    <p className="text-red-500">
      No shipping address found. Please update your profile.
    </p>
  )}
</div>


      <div className="border p-4 rounded mb-6">
        {items.map((item) => (
          <div key={item.productId} className="flex justify-between mb-2">
            <span>{item.name} × {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="text-right">
        <p className="text-xl font-bold">Total: ₹{totalPrice}</p>
        <button
          onClick={handleConfirmOrder}
          className="bg-purple-600 text-white px-6 py-2 rounded mt-3"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};*/
return (
  <div className="min-h-screen bg-gray-100 py-10 px-4">
    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
      
      {/* LEFT SIDE */}
      <div className="md:col-span-2 space-y-6">
        
        {/* Shipping Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">
            Shipping Address
          </h3>

          {user?.shippingAddress ? (
            <div className="text-gray-700 space-y-1">
              <p className="font-medium">
                {user.shippingAddress.fullName}
              </p>
              <p>{user.email}</p>
              <p>{user.shippingAddress.phone}</p>
              <p>
                {user.shippingAddress.addressLine1}
                {user.shippingAddress.addressLine2 &&
                  `, ${user.shippingAddress.addressLine2}`}
              </p>
              <p>
                {user.shippingAddress.city}, {user.shippingAddress.state}
              </p>
              <p>
                {user.shippingAddress.postalCode},{" "}
                {user.shippingAddress.country}
              </p>
            </div>
          ) : (
            <p className="text-red-500">
              No shipping address found. Please update your profile.
            </p>
          )}
        </div>

        {/* Cart Items Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">
            Order Items
          </h3>

          {items.map((item) => (
            <div
  key={item.productId}
  className="flex justify-between items-center border-b py-4"
>
  <div>
    <p className="font-medium text-gray-800">{item.name}</p>
    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
  </div>

  <p className="font-semibold text-gray-900">
    ₹{item.price * item.quantity}
  </p>


              <span>
                {item.name} × {item.quantity}
              </span>
              <span className="font-medium">
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE - SUMMARY */}
      <div className="bg-white p-6 rounded-2xl shadow-lg h-fit">
        <h3 className="text-xl font-semibold mb-6">
          Order Summary
        </h3>

        <div className="flex justify-between mb-3">
          <span>Subtotal</span>
          <span>₹{totalPrice}</span>
        </div>

        <div className="flex justify-between mb-3">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </div>

        <div className="border-t pt-4 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>

        <button
          onClick={handleConfirmOrder}
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl transition duration-300 font-medium"
        >
          Confirm Order
        </button>
      </div>
    </div>
  </div>
);
};

export default Checkout;

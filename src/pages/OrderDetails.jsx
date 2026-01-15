import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";
import { apiCancelOrder } from "../api/orders";


export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
      } catch (err) {
        console.error("Order details error:", err);
        setError("Failed to load order details");
      }
    };

    loadOrder();
  }, [id]);

  const handleCancelOrder = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      await apiCancelOrder(order._id);
toast.success("Order cancelled successfully");

setTimeout(() => {
  navigate("/orders");
}, 800);

    } catch (err) {
      console.error("Cancel order error:", err);
      toast.error("Failed to cancel order");
    }
  };

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }

  if (!order) {
    return <p className="p-6">Loading…</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button
    onClick={() => navigate("/orders")}
    className="mb-6 text-sm text-blue-600 hover:underline"
  >
    ← Back to Orders
  </button>
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      <p className="text-sm text-gray-500 mb-6">
        Order ID: {order._id}
      </p>

      {/* ORDER ITEMS */}
      <div className="space-y-4">
        {order.items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border rounded-lg p-4"
          >
            {/* IMAGE */}
            <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-400">No Image</span>
              )}
            </div>

            {/* DETAILS */}
            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">
                ₹{item.price} × {item.quantity}
              </p>
            </div>

            {/* LINE TOTAL */}
            <p className="font-semibold">
              ₹{item.price * item.quantity}
            </p>
          </div>
        ))}
      </div>

      {/* ORDER SUMMARY */}
      <div className="mt-6 text-right">
        <p className="text-lg font-bold">
          Total: ₹{order.totalAmount}
        </p>
        <p className="text-sm text-green-600 capitalize">
          Status: {order.status}
        </p>
        {order.status === "Pending" && (
          <div className="mt-4">
            <button
              onClick={handleCancelOrder}
              className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
            >
              Cancel Order
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

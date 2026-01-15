import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
  const loadOrders = async () => {
    try {
      const res = await api.get("/orders/my");
      setOrders(Array.isArray(res.data.orders) ? res.data.orders : []);
    } catch (err) {
      console.error("Orders fetch error:", err);
      setError("Couldn't load your orders. Please try again later.");
      setOrders([]);
    }
  };

  loadOrders();
}, []);


  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      {error && <p className="text-red-600">{error}</p>}

      {!error && orders.length === 0 && (
        <p className="text-gray-500">You have no orders yet.</p>
      )}

      {!error && orders.length > 0 && (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order._id}
              to={`/orders/${order._id}`}
              className="block rounded-xl border border-gray-200 bg-white p-4 hover:shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">
                    Order #{order._id.slice(-6)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-indigo-600">
                    ₹{order.totalAmount}
                  </p>
                  <p className="text-sm text-green-600 capitalize">
                    {order.status}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

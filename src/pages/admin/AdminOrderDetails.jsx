import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAdminOrderById, updateAdminOrderStatus } from "../../api/admin";
import { toast } from "react-toastify";

export default function AdminOrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

 useEffect(() => {
  fetchAdminOrderById(id)
    .then(setOrder)
    .catch(() => toast.error("Failed to load order"));
}, [id]);


  const handleStatusChange = async (e) => {
    const updated = await updateAdminOrderStatus(id, e.target.value);
    setOrder(updated);
    toast.success("Order status updated");
  };

  if (!order) return null;

  return (
    <div>
      <h2>Order Details</h2>

      <p><b>User:</b> {order.user.email}</p>
      <p><b>Total:</b> ₹{order.totalAmount}</p>

      <select value={order.status} onChange={handleStatusChange}>
        <option>Pending</option>
        <option>Shipped</option>
        <option>Delivered</option>
        <option>Cancelled</option>
      </select>

      <hr />

      {order.items.map(item => (
        <div key={item.productId}>
          <img src={item.image} width="60" />
          <span>{item.name} × {item.quantity}</span>
        </div>
      ))}
    </div>
  );
}

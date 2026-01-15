import api from "./axios";

export const fetchAdminOrders = async () => {
  const res = await api.get("/admin/orders");
  return res.data.orders;
};

export const fetchAdminOrderById = async (id) => {
  const res = await api.get(`/admin/orders/${id}`);
  return res.data;
};

export const updateAdminOrderStatus = async (id, status) => {
  const res = await api.put(`/admin/orders/${id}/status`, { status });
  return res.data;
};

// src/api/orders.js
import api from "./axios";

export const apiCreateOrder = async (orderData) => {
  const res = await api.post("/orders", orderData);
  return res.data;
};


export const apiGetMyOrders = async () => {
  const res = await api.get("/orders/my");
  return res.data;
};

export const apiGetOrderById = async (orderId) => {
  const res = await api.get(`/orders/${orderId}`);
  return res.data;
};

export const apiCancelOrder = async (orderId) => {
  const res = await api.put(`/orders/${orderId}/cancel`);
  return res.data;
};


// src/api/cart.js
import api from "./axios";

// POST /api/cart
export async function apiAddToCart(productId, quantity = 1) {
  const res = await api.post("/cart", { productId, quantity });
  return res.data;
}

// GET /api/cart
export async function apiGetCart() {
  const res = await api.get("/cart");
  return res.data;
}

// PATCH /api/cart/:productId
export async function apiUpdateCartItem(productId, quantity) {
  const res = await api.patch(`/cart/${productId}`, { quantity });
  return res.data;
}

// DELETE /api/cart/:productId
export async function apiRemoveCartItem(productId) {
  const res = await api.delete(`/cart/${productId}`);
  return res.data;
}

// DELETE /api/cart
export async function apiClearCart() {
  const res = await api.delete("/cart");
  return res.data;
}

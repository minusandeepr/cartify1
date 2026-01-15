import api from "./axios";

export const apiGetWishlist = async () => {
  const res = await api.get("/wishlist");
  return res.data;
};

export const apiToggleWishlist = async (productId) => {
  const res = await api.post(`/wishlist/${productId}`);
  return res.data;
};

export const apiRemoveFromWishlist = async (productId) => {
  const res = await api.delete(`/wishlist/${productId}`);
  return res.data;
};

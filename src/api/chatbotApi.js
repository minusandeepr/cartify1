import axios from "./axios";

export const fetchMyOrders = async () => {
  const res = await axios.get("/orders/my");
  return res.data.orders; 
};

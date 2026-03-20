import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// RESPONSE interceptor (ADD THIS)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
     // window.location.href = "/auth/login"; 
    // window.location.replace("/auth/login");
    localStorage.removeItem("user");

    }
    return Promise.reject(error);
  }
);

export default api;
// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { setAuthSuccess } from "./features/auth/authSlice";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";

import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Cart from "./pages/Cart.jsx";
import Orders from "./pages/Orders.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import AdminProducts from "./pages/AdminProducts.jsx"
import AdminProductForm from "./pages/AdminProductForm.jsx";
import AdminOrders from "./pages/admin/AdminOrders.jsx";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails.jsx";
import "./i18n";
import store from "./app/store";  
import "./global.css";

const token = localStorage.getItem("token");
const userRaw = localStorage.getItem("user");

if (token && userRaw) {
  try {
    const user = JSON.parse(userRaw);
    store.dispatch(setAuthSuccess({ token, user }));
  } catch (err) {
    console.error("Invalid user in localStorage");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="products">
              <Route index element={<Products />} />
              <Route path=":id" element={<ProductDetail />} />
            </Route>

            {/* Protected routes (requires auth) */}
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="cart" element={<Cart />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="profile" element={<Profile />}/>
              <Route path="orders" element={<Orders />} /> 
              <Route path="orders/:id" element={<OrderDetails />} /> 
            </Route>

            {/* Admin-only */}
<Route element={<AdminRoute />}>
  <Route path="admin/dashboard" element={<AdminDashboard />} />
  <Route path="admin/products" element={<AdminProducts />} />
  <Route path="admin/products/new" element={<AdminProductForm />} />
  <Route path="admin/products/:id/edit" element={<AdminProductForm />} />

  <Route path="admin/orders" element={<AdminOrders />} />
  <Route path="admin/orders/:id" element={<AdminOrderDetails />} />

  
</Route>



            {/* Auth pages */}
            <Route path="auth">
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
            </Route>
            

            <Route path="*" element={<div className="p-8">Page not found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

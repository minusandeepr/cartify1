// src/components/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const auth = useSelector((state) => state.auth);
  const isLoggedIn = !!(auth && auth.token);

  if (!isLoggedIn) return <Navigate to="/auth/login" replace />;

  return <Outlet />;
}

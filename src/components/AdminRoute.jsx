import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminRoute() {
  const { user } = useSelector((s) => s.auth);

  if (!user) return <Navigate to="/auth/login" replace />;

  
  if (user.role !== "admin" && user.isAdmin !== true) {
    return <Navigate to="/" replace />;
  }

  
  return <Outlet />;
}

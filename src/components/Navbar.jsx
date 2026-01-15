import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { logout } from "../features/auth/authSlice";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth || {});
  const isAdmin = user?.role === "admin";

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const avatarButtonRef = useRef(null);

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    dispatch(logout());
    navigate("/auth/login");
  };

  const firstLetter =
    user?.username?.[0]?.toUpperCase() ||
    user?.name?.[0]?.toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    "U";

  const displayName = user?.username || user?.name || user?.email || "";

  
  useEffect(() => {
    const close = (e) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target) &&
        avatarButtonRef.current &&
        !avatarButtonRef.current.contains(e.target)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-semibold">
          Cartify
        </Link>

        {/* Main Nav */}
        <nav className="hidden md:flex gap-4">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/products">Products</NavLink>

          {isAuthenticated && !isAdmin && (
            <>
              <NavLink to="/wishlist">Wishlist</NavLink>
              <NavLink to="/cart">Cart</NavLink>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </>
          )}

          {isAuthenticated && isAdmin && (
            <>
              <NavLink to="/admin/dashboard">Admin Dashboard</NavLink>
              <NavLink to="/admin/orders">Orders</NavLink>
            </>
          )}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          {!isAuthenticated ? (
            <Link to="/auth/login" className="px-3 py-1 border rounded-full">
              Login
            </Link>
          ) : (
            <div className="relative" ref={userMenuRef}>
              <button
                ref={avatarButtonRef}
                onClick={() => setIsUserMenuOpen((o) => !o)}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100"
              >
                <span className="w-8 h-8 flex items-center justify-center bg-purple-600 text-white rounded-full">
                  {firstLetter}
                </span>
                <span className="hidden sm:inline">{displayName}</span>
                ▾
              </button>

              {isUserMenuOpen && (
  <div className="absolute right-0 mt-2 w-56 bg-white shadow rounded-xl border py-1 z-50">
    {!isAdmin && (
      <>
        <button
          onClick={() => navigate("/dashboard")}
          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate("/orders")}
          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
        >
          Orders
        </button>
      </>
    )}

    {isAdmin && (
      <>
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
        >
          Admin Dashboard
        </button>
        <button
          onClick={() => navigate("/admin/orders")}
          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
        >
          Manage Orders
        </button>
      </>
    )}

    <div className="border-t my-1" />

    <button
      onClick={handleLogout}
      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
    >
      Logout
    </button>
  </div>
)}

            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

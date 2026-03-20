import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import LanguageSwitcher from "./LanguageSwitcher";
import api from "../api/axios";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth || {});
  const isAdmin = user?.role === "admin";

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // 🔍 Search states
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const userMenuRef = useRef(null);
  const avatarButtonRef = useRef(null);
  const searchRef = useRef(null);

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

  // 🔒 Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target) &&
        avatarButtonRef.current &&
        !avatarButtonRef.current.contains(e.target)
      ) {
        setIsUserMenuOpen(false);
      }

      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔥 LIVE SEARCH (Axios + debounce)
  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await api.get("/products", {
          params: { search },
        });

        // backend returns `items`
        setResults((res.data.items || []).slice(0, 6));
        setShowResults(true);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // ✨ Highlight matched text
  const highlight = (text) => {
    const regex = new RegExp(`(${search})`, "ig");
    return text.replace(regex, "<strong>$1</strong>");
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-semibold">
          Cartify
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex gap-6 items-center">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>
        </nav>

        {/* 🔍 Search */}
        <div className="relative hidden md:block" ref={searchRef}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-full px-4 py-1 text-sm w-56 outline-none"
          />

          {showResults && (
            <div className="absolute top-10 left-0 w-full bg-white shadow-lg rounded-lg border z-50 max-h-72 overflow-y-auto">
              {results.length > 0 ? (
                results.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      navigate(`/products/${item._id}`);
                      setSearch("");
                      setShowResults(false);
                    }}
                    className="flex gap-3 items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      src={item.images?.[0]?.url}
                      alt={item.name}
                      className="w-10 h-10 rounded object-cover border"
                    />

                    <div className="flex-1">
                      <p
                        className="text-sm"
                        dangerouslySetInnerHTML={{
                          __html: highlight(item.name),
                        }}
                      />
                      <p className="text-xs text-gray-500">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500">
                  No products found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right side */}
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
                <span className="hidden sm:inline">{displayName}</span> ▾
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white shadow rounded-xl border py-1 z-50">
                  {!isAdmin && (
                    <>
                                      <button
                        onClick={() => navigate("/profile")}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Profile
                      </button>
                      <button onClick={() => navigate("/dashboard")} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                        Dashboard
                      </button>
                      <button onClick={() => navigate("/wishlist")} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                        Wishlist
                      </button>
                      <button onClick={() => navigate("/cart")} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                        Cart
                      </button>
                      <button onClick={() => navigate("/orders")} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                        Orders
                      </button>
                    </>
                  )}

                  {isAdmin && (
                    <>
                      <button onClick={() => navigate("/admin/dashboard")} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                        Admin Dashboard
                      </button>
                      <button onClick={() => navigate("/admin/orders")} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                        Manage Orders
                      </button>
                    </>
                  )}

                  <div className="border-t my-1" />

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
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

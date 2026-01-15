// src/pages/Dashboard.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-2xl font-semibold mb-2">You’re not logged in</h1>
        <p className="text-slate-600 mb-6">
          Please sign in to see your dashboard.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Go to login
        </Link>
      </div>
    );
  }
  if (user.isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const initial =
    user.name?.charAt(0)?.toUpperCase() ||
    user.email?.charAt(0)?.toUpperCase() ||
    "?";

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      {/* Heading */}
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
        Hi, {user?.username || user.email}
      </h1>
      <p className="text-slate-600 mb-8">
        Here’s a quick overview of your Cartify account.
      </p>

      {/* Profile card */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex items-center gap-6">
        <div className="h-16 w-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-semibold">
          {initial}
        </div>

        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
            Account
          </p>
          <p className="text-lg font-medium text-slate-900">
            {user?.username || "No name set"}

          </p>
          <p className="text-slate-600 text-sm">{user.email}</p>
        </div>

        {/* Small status pill – optional */}
        {user.isAdmin && (
          <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
            Admin
          </span>
        )}
      </section>

      {/* Quick links */}
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <Link
          to="/wishlist"
          className="group bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-indigo-500 hover:shadow-md transition flex flex-col justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Wishlist
            </p>
            <p className="mt-1 text-sm text-slate-600">
              View and manage items you’ve saved for later.
            </p>
          </div>
          <span className="mt-3 text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
            Go to wishlist →
          </span>
        </Link>

        <Link
          to="/cart"
          className="group bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-indigo-500 hover:shadow-md transition flex flex-col justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Cart
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Review items in your cart and checkout faster.
            </p>
          </div>
          <span className="mt-3 text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
            Go to cart →
          </span>
        </Link>

        <Link
          to="/products"
          className="group bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-indigo-500 hover:shadow-md transition flex flex-col justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Browse
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Continue shopping and discover new products.
            </p>
          </div>
          <span className="mt-3 text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
            Shop products →
          </span>
        </Link>
      </section>
    </div>
  );
};

export default Dashboard;

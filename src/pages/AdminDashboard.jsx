import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";


export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  Promise.all([
    api.get("/admin/stats"),
    api.get("/admin/revenue-chart")
  ])
    .then(([statsRes, chartRes]) => {
      setStats(statsRes.data);
      setChartData(chartRes.data);
    })
    .catch((err) => {
      console.error("Dashboard load error:", err);
    })
    .finally(() => setLoading(false));
}, []);


  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* STATS CARDS */}
      {loading ? (
        <p className="text-gray-500">Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          <StatCard title="Orders" value={stats.totalOrders} />
          <StatCard title="Pending" value={stats.pendingOrders} />
          <StatCard title="Revenue" value={`₹${stats.totalRevenue}`} />
          <StatCard title="Products" value={stats.totalProducts} />
          <StatCard title="Users" value={stats.totalUsers} />
        </div>
      )}
      {/* REVENUE CHART */}
{!loading && chartData.length > 0 && (
  <div className="bg-white border rounded-xl p-6 mb-10">
    <h2 className="text-xl font-semibold mb-4">Revenue Over Time</h2>

    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#4f46e5"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
)}


      {/* QUICK LINKS */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        <DashboardLink to="/admin/products" title="Manage Products" />
        <DashboardLink to="/admin/orders" title="Manage Orders" />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}

function DashboardLink({ to, title }) {
  return (
    <Link
      to={to}
      className="block border rounded-xl p-6 hover:shadow-md transition"
    >
      <h2 className="text-lg font-semibold">{title}</h2>
    </Link>
  );
}

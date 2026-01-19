import { useState, useEffect } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const res = await axios.get("/admin/categories");
            setCategories(res.data);
        } catch (err) {
            console.error("Failed to fetch categories:", err);
            toast.error("Failed to load categories");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this category?")) return;

        try {
            await axios.delete(`/admin/categories/${id}`);
            toast.success("Category deleted successfully");
            fetchCategories();
        } catch (err) {
            console.error("Delete error:", err);
            toast.error("Failed to delete category");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl">Loading categories...</div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Categories</h1>
                <Link
                    to="/admin/categories/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    + Add Category
                </Link>
            </div>

            {categories.length === 0 ? (
                <div className="bg-white p-8 rounded shadow text-center">
                    <p className="text-gray-500 mb-4">No categories found</p>
                    <Link
                        to="/admin/categories/new"
                        className="text-blue-600 hover:underline"
                    >
                        Create your first category
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="text-left p-4 font-semibold">Name</th>
                                <th className="text-left p-4 font-semibold">Created At</th>
                                <th className="text-right p-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category._id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 font-medium">{category.name}</td>
                                    <td className="p-4 text-gray-600">
                                        {new Date(category.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <Link
                                            to={`/admin/categories/${category._id}/edit`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(category._id)}
                                            className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="mt-6">
                <Link
                    to="/admin/dashboard"
                    className="text-blue-600 hover:underline"
                >
                    ← Back to Dashboard
                </Link>
            </div>
        </div>
    );
}

import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "../api/axios";
import { toast } from "react-toastify";

export default function AdminCategoryForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);

    useEffect(() => {
        if (isEdit) {
            fetchCategory();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchCategory = async () => {
        try {
            setFetchLoading(true);
            const res = await axios.get(`/admin/categories/${id}`);
            setName(res.data.name);
        } catch (err) {
            console.error("Failed to fetch category:", err);
            toast.error("Failed to load category");
            navigate("/admin/categories");
        } finally {
            setFetchLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Category name is required");
            return;
        }

        try {
            setLoading(true);

            if (isEdit) {
                await axios.put(`/admin/categories/${id}`, { name: name.trim() });
                toast.success("Category updated successfully");
            } else {
                await axios.post("/admin/categories", { name: name.trim() });
                toast.success("Category created successfully");
            }

            navigate("/admin/categories");
        } catch (err) {
            console.error("Save error:", err);
            const errorMsg = err.response?.data?.message || "Failed to save category";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded shadow p-8">
                <h1 className="text-3xl font-bold mb-6">
                    {isEdit ? "Edit Category" : "Create Category"}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Category Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Electronics, Clothing, Books"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                        >
                            {loading ? "Saving..." : isEdit ? "Update Category" : "Create Category"}
                        </button>

                        <Link
                            to="/admin/categories"
                            className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded hover:bg-gray-300 transition text-center font-medium"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>

            <div className="mt-6">
                <Link
                    to="/admin/categories"
                    className="text-blue-600 hover:underline"
                >
                    ← Back to Categories
                </Link>
            </div>
        </div>
    );
}

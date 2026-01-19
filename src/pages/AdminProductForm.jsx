import axios from "../api/axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function AdminProductForm() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const res = await axios.get("/admin/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      toast.error("Failed to load categories");
    } finally {
      setCategoriesLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.category) {
      toast.error("Please select a category");
      return;
    }

    if (!image) {
      toast.error("Please select a product image");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("category", form.category); // This is now the ObjectId
    formData.append("description", form.description);
    formData.append("image", image);

    try {
      setLoading(true);
      await axios.post("/admin/products", formData);
      toast.success("Product created successfully!");

      // Reset form
      setForm({
        name: "",
        price: "",
        stock: "",
        category: "",
        description: "",
      });
      setImage(null);
    } catch (err) {
      console.error("Create product error:", err);
      const errorMsg = err.response?.data?.message || "Failed to create product";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="max-w-xl mx-auto bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-semibold mb-4">Create Product</h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Product name"
        required
      />

      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />

      <input
        name="stock"
        type="number"
        value={form.stock}
        onChange={handleChange}
        placeholder="Stock"
      />

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Category *</label>
          <Link
            to="/admin/categories"
            className="text-xs text-blue-600 hover:underline"
            target="_blank"
          >
            Manage Categories
          </Link>
        </div>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
          disabled={categoriesLoading}
        >
          <option value="">
            {categoriesLoading ? "Loading categories..." : "Select a category"}
          </option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Create Product"}
      </button>
    </form>
  );
}

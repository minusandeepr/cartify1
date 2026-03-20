import { useEffect, useState } from "react";
import axios from "../api/axios";
import { toast } from "react-toastify";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function AdminProductForm() {
  const { id } = useParams();               // product id (edit mode)
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  /* ---------------- FETCH CATEGORIES ---------------- */
  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const res = await axios.get("/admin/categories");
      setCategories(res.data);
    } catch (err) {
      toast.error("Failed to load categories");
    } finally {
      setCategoriesLoading(false);
    }
  };

  /* ---------------- FETCH PRODUCT (EDIT) ---------------- */
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/products/${id}`);
      const p = res.data;

      setForm({
        name: p.name || "",
        price: p.price || "",
        stock: p.stock || "",
        category: p.category || "",
        description: p.description || "",
      });
    } catch (err) {
      toast.error("Failed to load product");
    }
  };

  useEffect(() => {
    fetchCategories();
    if (isEdit) fetchProduct();
  }, [id]);

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.category) {
      toast.error("Please select a category");
      return;
    }

    if (!image && !isEdit) {
      toast.error("Please select a product image");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);

      if (isEdit) {
        await axios.put(`/admin/products/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product updated successfully");
      } else {
        await axios.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product created successfully");
      }

      navigate("/admin/products");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to save product"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-semibold mb-4">
        {isEdit ? "Edit Product" : "Create Product"}
      </h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Product name"
        required
        className="input"
      />

      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        required
        className="input"
      />

      <input
        name="stock"
        type="number"
        value={form.stock}
        onChange={handleChange}
        placeholder="Stock"
        className="input"
      />

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Category *</label>
          <Link
            to="/admin/categories"
            className="text-xs text-blue-600"
            target="_blank"
          >
            Manage Categories
          </Link>
        </div>

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          disabled={categoriesLoading}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">
            {categoriesLoading ? "Loading..." : "Select a category"}
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
        className="input"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button type="submit" disabled={loading} className="btn w-full mt-4">
        {loading
          ? "Saving..."
          : isEdit
          ? "Update Product"
          : "Create Product"}
      </button>
    </form>
  );
}

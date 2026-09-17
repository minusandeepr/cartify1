import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();

        if (cancelled) return;

        const list = Array.isArray(data) ? data : data.items || [];
        setProducts(list);
      } catch (err) {
        console.error("Failed to load products on Home:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const featured = products.slice(0, 4);

  return (
    <div className="bg-white min-h-screen">

      {/* ================= HERO ================= */}
      <Hero />

      {/* ================= FEATURED PICKS ================= */}
      <section className="bg-gray-50/70 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-16">

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8">

            <div>
              {/* Small label */}
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-1 rounded-full bg-purple-600"></span>

                <span className="text-sm font-semibold text-purple-600 uppercase tracking-wider">
                  Featured
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                {t("featured.heading")}
              </h2>

              <p className="mt-2 text-gray-500 text-base">
                {t("featured.sub")}
              </p>
            </div>

            {/* View all */}
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors"
            >
              View all products
              <span className="text-lg">→</span>
            </button>

          </div>

          {/* Products */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-[470px] bg-white rounded-2xl border border-gray-100 animate-pulse"
                />
              ))}
            </div>
          ) : featured.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
              <p className="text-gray-500">
                No products found.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          )}

        </div>
      </section>

    </div>
  );
};

export default Home;
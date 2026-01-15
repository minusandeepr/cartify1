import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        // Call your backend directly
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();

        if (cancelled) return;

        // Backend returns { items: [...] }
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
      {/* HERO */}
      <Hero />

      {/* FEATURED PICKS */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {t("featured.heading")}
            </h2>
            <p className="text-gray-600">{t("featured.sub")}</p>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading products…</p>
        ) : featured.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;

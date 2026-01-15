import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProductCard from "./ProductCard";

export default function Featured() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
      })
      .catch((err) => console.error("Featured products fetch failed:", err));
  }, []);

  return (
    <section className="px-6 md:px-12 lg:px-20 mt-10">
      <h2 className="text-2xl font-semibold text-gray-900">
        {t("featured.heading", "Featured picks")}
      </h2>

      <p className="text-gray-500 mb-6">
        {t("featured.sub", "Handpicked products for you.")}
      </p>

      {/* Products Grid */}
      {products.length === 0 ? (
        <p className="text-gray-400">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

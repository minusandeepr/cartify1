import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HERO_IMAGE =
  "https://images.pexels.com/photos/796602/pexels-photo-796602.jpeg?auto=compress&cs=tinysrgb&w=1200";

export default function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleShop = () => {
    navigate("/products");
  };

  const handleCreateAccount = () => {
    navigate("/auth/register");
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      {/* Text side */}
      <div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900">
          {t("hero.titleLine1")}
          <br />
          <span className="text-purple-600">{t("hero.titleLine2")}</span>
        </h1>

        <p className="mt-4 text-gray-600 text-lg max-w-xl">
          {t("hero.subtitle")}
        </p>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleShop}
            className="px-6 py-3 bg-purple-600 text-white rounded-md shadow hover:bg-purple-700 transition"
          >
            {t("hero.shop")}
          </button>

          <button
            onClick={handleCreateAccount}
            className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition"
          >
            {t("hero.create")}
          </button>
        </div>
      </div>

      {/* Image side */}
      <div>
        <img
          src={HERO_IMAGE}
          alt={t("hero.imageAlt")}
          className="rounded-xl shadow-md w-full object-cover"
        />
      </div>
    </section>
  );
}

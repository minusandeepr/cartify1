import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import heroImage from "../assets/cartify-hero.png";

export default function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleShop = () => {
    navigate("/products");
  };

  const handleCreateAccount = () => {
    navigate("/auth/register");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-indigo-50">

      {/* Background decoration */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 right-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">

        {/* ================= LEFT ================= */}
        <div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-5">
            <span className="w-2 h-2 bg-purple-600 rounded-full" />
            Your everyday shopping, simplified
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight text-slate-900">
            {t("hero.titleLine1")}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              {t("hero.titleLine2")}
            </span>
          </h1>

          {/* Description */}
          <p className="mt-5 text-gray-600 text-lg leading-relaxed max-w-xl">
            {t("hero.subtitle")}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-7">
            <button
              onClick={handleShop}
              className="px-7 py-3.5 bg-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-200 hover:bg-purple-700 hover:-translate-y-0.5 transition-all duration-200"
            >
              {t("hero.shop")} →
            </button>

            {!user && (
              <button
                onClick={handleCreateAccount}
                className="px-7 py-3.5 bg-white text-slate-800 border border-gray-200 rounded-xl font-semibold hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
              >
                {t("hero.create")}
              </button>
            )}
          </div>

          {/* Trust features */}
          <div className="grid grid-cols-3 gap-5 mt-9 max-w-lg">

            <div>
              <div className="text-xl mb-1">🚚</div>
              <p className="text-sm font-semibold text-slate-800">
                Fast Delivery
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Quick & reliable
              </p>
            </div>

            <div>
              <div className="text-xl mb-1">🔒</div>
              <p className="text-sm font-semibold text-slate-800">
                Secure Payment
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Safe checkout
              </p>
            </div>

            <div>
              <div className="text-xl mb-1">↩️</div>
              <p className="text-sm font-semibold text-slate-800">
                Easy Returns
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Shop with confidence
              </p>
            </div>

          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="relative">

          {/* Main image */}
          <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-purple-100">

            <img
              src={heroImage}
              alt={t("hero.imageAlt")}
              className="w-full h-[350px] sm:h-[400px] lg:h-[450px] object-cover object-center"
            />

          </div>

          {/* Top floating card */}
          <div className="absolute top-5 right-4 sm:-right-4 bg-white rounded-xl shadow-lg px-4 py-3">
            <p className="text-xs text-gray-500">
              Shopping made
            </p>

            <p className="text-sm font-bold text-purple-600">
              Simple & Easy
            </p>
          </div>

          {/* Bottom floating card */}
          <div className="absolute bottom-5 left-4 sm:-left-5 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-lg">
              ✨
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">
                Curated for you
              </p>

              <p className="text-xs text-gray-500">
                Quality products, great prices
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
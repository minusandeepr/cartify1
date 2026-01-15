import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
  };

  
  const current =
    i18n.language && i18n.language.startsWith("hi") ? "hi" : "en";

  return (
    <select
      value={current}
      onChange={handleChange}
      className="border rounded px-3 py-1 text-sm"
    >
      <option value="en">English</option>
      <option value="hi">हिंदी</option>
    </select>
  );
};

export default LanguageSwitcher;

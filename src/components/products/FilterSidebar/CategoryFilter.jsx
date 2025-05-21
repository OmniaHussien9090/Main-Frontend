import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n"; 

const CategoryFilter = ({ categories, selectedCategories, handleCategoryChange }) => {
  const { t } = useTranslation("products");
  const currentLang = i18n.language;

  return (
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-4">{t("categories.title")}</h3>
      <div className="space-y-2">
        {categories && categories.length > 0 ? (
          <>
            {categories.slice(0, 5).map((category) => (
              <div key={category._id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category._id}`}
                  checked={selectedCategories.includes(category._id)}
                  onChange={() => handleCategoryChange(category._id)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor={`category-${category._id}`}
                  className="ml-3 text-base text-gray-800 cursor-pointer"
                >
                  {category.name?.[currentLang]|| category.name || t("categories.unnamed")}
                </label>
              </div>
            ))}

            {categories.length > 5 && (
              <div className="relative">
                <input
                  type="checkbox"
                  id="category-expander"
                  className="hidden peer"
                />
                <div className="max-h-0 overflow-hidden peer-checked:max-h-[1000px] transition-all duration-300">
                  {categories.slice(5).map((category) => (
                    <div
                      key={category._id}
                      className="flex items-center mt-2"
                    >
                      <input
                        type="checkbox"
                        id={`category-${category._id}`}
                        checked={selectedCategories.includes(category._id)}
                        onChange={() => handleCategoryChange(category._id)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`category-${category._id}`}
                        className="ml-3 text-base text-gray-800 cursor-pointer"
                      >
                        {category.name?.[currentLang]|| category.name || t("categories.unnamed")}
                      </label>
                    </div>
                  ))}
                </div>
                <label
                  htmlFor="category-expander"
                  className="flex items-center justify-center text-sm text-gray-600 mt-2 cursor-pointer hover:text-gray-900"
                >
                  <span className="mr-1">
                    {t("categories.more", { count: categories.length - 5 })}
                  </span>
                  <svg
                    className="w-4 h-4 transition-transform peer-checked:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </label>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500 text-sm">{t("categories.none")}</p>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;

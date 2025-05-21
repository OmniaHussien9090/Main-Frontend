import React from "react";
import { useTranslation } from "react-i18next";

const ColorFilter = ({ colorOptions, selectedColors, handleColorChange }) => {
  const { t } = useTranslation("products");

  return (
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-4">{t("colors.title")}</h3>
      <div className="space-y-2">
        {colorOptions.slice(0, 5).map((color) => (
          <div key={color.originalName} className="flex items-center">
            <input
              type="checkbox"
              id={`color-${color.originalName}`}
              checked={selectedColors.includes(color.originalName)}
              onChange={() => handleColorChange(color.originalName)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor={`color-${color.originalName}`}
              className="ml-3 text-base text-gray-800"
            >
              {color.name}
              <span className="ml-1.5 text-xs font-normal text-gray-500">
                ({color.count})
              </span>
            </label>
          </div>
        ))}

        {colorOptions.length > 5 && (
          <div className="relative">
            <input
              type="checkbox"
              id="color-expander"
              className="hidden peer"
            />
            <div className="max-h-0 overflow-hidden peer-checked:max-h-[1000px] transition-all duration-300">
              {colorOptions.slice(5).map((color) => (
                <div
                  key={color.originalName}
                  className="flex items-center mt-2"
                >
                  <input
                    type="checkbox"
                    id={`color-${color.originalName}`}
                    checked={selectedColors.includes(color.originalName)}
                    onChange={() => handleColorChange(color.originalName)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`color-${color.originalName}`}
                    className="ml-3 text-base text-gray-800"
                  >
                    {color.name}
                    <span className="ml-1.5 text-xs font-normal text-gray-500">
                      ({color.count})
                    </span>
                  </label>
                </div>
              ))}
            </div>
            <label
              htmlFor="color-expander"
              className="flex items-center justify-center text-sm text-gray-600 mt-2 cursor-pointer hover:text-gray-900"
            >
              <span className="mr-1">
                {t("colors.more", { count: colorOptions.length - 5 })}
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
      </div>
    </div>
  );
};

export default ColorFilter;

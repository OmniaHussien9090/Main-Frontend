import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const SortDropdown = ({ selectedRatings, handleRatingChange }) => {
  const { t } = useTranslation("products");
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    console.log("Dropdown toggled!");
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative mb-6">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        <span>{t("title")}</span>
        <svg
          className={`w-5 h-5 ml-2 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg"
          style={{ left: 0, top: "100%" }}
        >
          <div className="p-2 space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div
                key={rating}
                className="flex items-center p-2 hover:bg-gray-50 rounded"
              >
                <input
                  type="checkbox"
                  id={`rating-${rating}`}
                  checked={selectedRatings.includes(rating)}
                  onChange={() => handleRatingChange(rating)}
                  className="mr-2 h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <label
                  htmlFor={`rating-${rating}`}
                  className="flex items-center cursor-pointer"
                >
                  {[...Array(rating)].map((_, i) => (
                    <svg
                      key={`filled-${i}`}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  {[...Array(5 - rating)].map((_, i) => (
                    <svg
                      key={`empty-${i}`}
                      className="w-4 h-4 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  {rating === 5 && (
                    <span className="ml-1 text-xs text-gray-500">
                      {t("rating.up")}
                    </span>
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;

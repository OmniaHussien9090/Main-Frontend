import React from "react";
import { useTranslation } from "react-i18next";

const PriceRangeFilter = ({
  tempSliderValues,
  handleMouseDown,
  calculatePosition,
  applyPriceFilter,
}) => {
  const { t } = useTranslation("products");

  return (
    <div className="mb-6">
      <h3 className="font-bold text-lg mb-4">{t("price.title")}</h3>
      <div className="flex justify-between mb-2">
        <span className="text-gray-600">${tempSliderValues.min}</span>
        <span className="text-gray-600">${tempSliderValues.max}</span>
      </div>
      <div className="py-1 relative min-w-full price-slider">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="absolute h-2 rounded-full bg-black"
            style={{
              left: `${calculatePosition(tempSliderValues.min)}%`,
              width: `${
                calculatePosition(tempSliderValues.max) - calculatePosition(tempSliderValues.min)
              }%`,
            }}
          ></div>
          <div
            className="absolute h-4 w-4 rounded-full bg-white shadow border border-gray-300 -ml-2 top-0 cursor-pointer"
            style={{ left: `${calculatePosition(tempSliderValues.min)}%` }}
            onMouseDown={() => handleMouseDown("min")}
          ></div>
          <div
            className="absolute h-4 w-4 rounded-full bg-white shadow border border-gray-300 -ml-2 top-0 cursor-pointer"
            style={{ left: `${calculatePosition(tempSliderValues.max)}%` }}
            onMouseDown={() => handleMouseDown("max")}
          ></div>
        </div>
      </div>
      <div className="flex gap-4 justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          {t("price.range", {
            min: tempSliderValues.min,
            max: tempSliderValues.max,
          })}
        </p>
        <button
          onClick={applyPriceFilter}
          className="bg-black text-white py-2 px-5 rounded hover:bg-gray-800 transition-colors cursor-pointer"
        >
          {t("price.button")}
        </button>
      </div>
    </div>
  );
};

export default PriceRangeFilter;

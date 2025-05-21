import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import CategoryFilter from "./CategoryFilter";
import ColorFilter from "./ColorFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import { useTranslation } from "react-i18next";

const FilterSidebar = ({
  searchTerm,
  setSearchTerm,
  categories,
  selectedCategories,
  handleCategoryChange,
  colorOptions,
  selectedColors,
  handleColorChange,
  tempSliderValues,
  handleMouseDown,
  calculatePosition,
  applyPriceFilter,
  resetFilters,
}) => {
  const { t } = useTranslation("products");

  return (
    <div className="lg:w-1/4">
      {/* Search input */}
      <div className="mb-4 flex justify-end mt-10">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder={t("search_placeholder")}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="border border-gray-300 px-4 py-2 pr-10 w-full placeholder-gray-400 focus:outline-0"
          />
          <RiSearch2Line className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" />
        </div>
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategories={selectedCategories}
        handleCategoryChange={handleCategoryChange}
      />

      <ColorFilter
        colorOptions={colorOptions}
        selectedColors={selectedColors}
        handleColorChange={handleColorChange}
      />

      <PriceRangeFilter
        tempSliderValues={tempSliderValues}
        handleMouseDown={handleMouseDown}
        calculatePosition={calculatePosition}
        applyPriceFilter={applyPriceFilter}
      />

      {/* Reset Filters Button */}
      <button
        onClick={resetFilters}
        className="w-full bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded text-sm"
      >
        {t("reset_filters")}
      </button>
    </div>
  );
};

export default FilterSidebar;

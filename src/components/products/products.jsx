import React, { useState } from "react";
import { useProducts } from "../utils/useProducts";
import ProductGrid from "./ProductGrid";
import FilterSidebar from "./FilterSidebar";
import SortDropdown from "./SortDropdown";
import PaginationControls from "./PaginationControls";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const Products = () => {
  const { t } = useTranslation("products");
  const currentLang = i18n.language;

  const {
    // variants,
    currentVariants,
    currentPage,
    totalPages,
    hasLoaded,
    filteredVariants,
    searchTerm,
    setSearchTerm,
    selectedCategories,
    handleCategoryChange,
    selectedColors,
    handleColorChange,
    tempSliderValues,
    handleMouseDown,
    calculatePosition,
    applyPriceFilter,
    resetFilters,
    // sortOption,
    // setSortOption,
    setCurrentPage,
    categories,
    colorOptions,
    selectedRatings,
    handleRatingChange,
  } = useProducts();

  const [selectedRatingFilters, setSelectedRatingFilters] = useState([]);

  // دالة تغيير التقييمات المختارة
  const handleRatingFilterChange = (rating) => {
    setSelectedRatingFilters((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  // فلترة المنتجات حسب التقييم المختار
  const filteredProducts =
    selectedRatingFilters.length === 0
      ? currentVariants
      : currentVariants.filter((product) =>
          selectedRatingFilters.includes(Math.round(product.rating))
        );

  // ترتيب المنتجات حسب التقييم من الأعلى للأقل
  const sortedProducts = [...filteredProducts].sort(
    (a, b) => b.rating - a.rating
  );

  return (
    <div className="flex flex-col-reverse lg:flex-row mx-20 my-15 gap-8 mt-10 p-8">
      {/* Products section */}
      <div className="lg:w-3/4 w-full mt-10">
        {/* Product count and sort */}
        {hasLoaded && filteredVariants.length > 0 && (
          <div className="flex md:flex-row flex-col md:gap-0 gap-4 justify-between items-center mb-4">
            <div className="text-gray-500 lg:text-lg text-sm ">
              {t("showingProducts", {
                current: currentVariants.length,
                total: filteredVariants.length,
              })}
            </div>
            <SortDropdown
              selectedRatings={selectedRatings}
              handleRatingChange={handleRatingChange}
            />
          </div>
        )}

        <ProductGrid
          hasLoaded={hasLoaded}
          currentVariants={currentVariants}
          filteredVariants={filteredVariants}
          resetFilters={resetFilters}
        />

        {/* Pagination */}
        {hasLoaded && filteredVariants.length > 0 && totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>

      {/* Filters section */}
      <FilterSidebar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categories={categories}
        selectedCategories={selectedCategories}
        handleCategoryChange={handleCategoryChange}
        colorOptions={colorOptions}
        selectedColors={selectedColors}
        handleColorChange={handleColorChange}
        tempSliderValues={tempSliderValues}
        handleMouseDown={handleMouseDown}
        calculatePosition={calculatePosition}
        applyPriceFilter={applyPriceFilter}
        resetFilters={resetFilters}
      />
    </div>
  );
};

export default Products;

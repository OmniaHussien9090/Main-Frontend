import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import ProductImages from "./components/ProductImage";
import ProductInfo from "./components/ProductInfo";
import ProductTabs from "./components/ProductTabs";
import RelatedProducts from "./components/RelatedProducts";
import useProductData from "./components/hooks/useProductData";
import useCart from "./components/hooks/useCart";
import { useTranslation } from "react-i18next";

const ProductDetails = () => {
  const { t, i18n } = useTranslation("productdetails");
  const currentLang = i18n.language;
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    product,
    loading,
    error,
    selectedVariant,
    selectedImage,
    setSelectedImage,
    handleVariantChange,
    relatedProducts,
  } = useProductData(id, location);

  const {
    quantity,
    handleQuantityChange,
    addToCart,
    toggleWishlist,
    isWishlisted,
  } = useCart(product, selectedVariant);

  if (loading)
    return <div className="text-center py-12">{t("loading")}</div>;

  if (error)
    return (
      <div className="text-center py-12 text-red-500">
        {t("error", { message: error })}
      </div>
    );

  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-10 mt-10 md:py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-black mb-6 transition-all duration-300 group cursor-pointer"
      >
        <FiArrowLeft className="mr-2 transition-all duration-300 group-hover:-translate-x-1" />
        <span>{t("backToProducts")}</span>
      </button>

      <div className="flex flex-col">
        {/* Product Image and Info Row */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <ProductImages
            variant={product.variants[selectedVariant]}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

          <ProductInfo
            product={product}
            selectedVariant={selectedVariant}
            quantity={quantity}
            handleQuantityChange={handleQuantityChange}
            handleVariantChange={handleVariantChange}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            isWishlisted={isWishlisted}
          />
        </div>

        {/* Tabs Section */}
        <ProductTabs product={product} />
      </div>

      <RelatedProducts
        products={relatedProducts}
        currentProductId={product._id}
      />
    </div>
  );
};

export default ProductDetails;

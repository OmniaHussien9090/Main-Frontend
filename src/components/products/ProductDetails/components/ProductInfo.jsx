import React from 'react';
import RatingStars from '../../RatingStars';
import ProductTabs from './ProductTabs';
import { useDispatch } from "react-redux";
import { addCartItem } from "../../../../redux/cartActions";
import { useTranslation } from "react-i18next";
import i18n from '../../../../i18n';
import { useNavigate } from "react-router-dom"; // لو تستخدم react-router
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductInfo = ({
  product,
  selectedVariant,
  quantity,
  handleQuantityChange,
  handleVariantChange,
  addToCart,
  toggleWishlist,
  isWishlisted
}) => {
  const { t } = useTranslation("productdetails");
  const currentLang = i18n.language; 
  const variant = product.variants[selectedVariant];
  const maxQuantity = variant.inStock || 10;
  const dispatch = useDispatch();
  const navigate = useNavigate();
 const handleAddToCart = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error(t("productInfo.mustLoginFirst"));
    navigate("/login");
    return;
  }

  dispatch(addCartItem({ product, quantity }))
    .unwrap()
    .then(() => {
      toast.success(t("productInfo.addedToCart"));
    })
    .catch((error) => {
      toast.error(error.message || "Failed to add to cart");
    });
};


  return (
    <div className="md:w-1/2">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        {variant.name?.[currentLang] || t("productInfo.defaultName")} 
      </h1>

      <div className="flex items-center mb-4">
        <RatingStars averageRating={variant.averageRating || 0} />
        <span className="ml-2 text-sm text-gray-500">
          ({t("productInfo.reviews", { count: variant.ratingCount || 0 })})
        </span>
      </div>

      <div className="flex gap-2 items-center mb-6">
        <span className="text-2xl font-semibold">
          ${variant.discountPrice?.toFixed(2) || variant.price?.toFixed(2)}
        </span>
        {variant.discountPrice && (
          <span className="ml-2 text-gray-500 line-through">
            ${variant.price?.toFixed(2)}
          </span>
        )}
      </div>

      {product.variants.length > 1 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">{t("productInfo.variants")}</h3>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v, index) => (
              <button
                key={v._id}
                onClick={() => handleVariantChange(index)}
                className={`px-4 py-2 border rounded-full ${
                  selectedVariant === index
                    ? "bg-black text-white border-black"
                    : "border-gray-300"
                }`}
              >
                {v.color?.[currentLang] || t("productInfo.variant", { number: index + 1 })} {/* تعديل من en إلى currentLang */}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <div className="flex items-center border border-gray-300">
          <button
            className="px-3 py-2 text-lg cursor-pointer"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="px-4 py-2">{quantity}</span>
          <button
            className="px-3 py-2 text-lg cursor-pointer"
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= maxQuantity}
          >
            +
          </button>
        </div>
        <button
  className="bg-black w-40 text-white py-3 px-6 cursor-pointer transition-colors"
  onClick={() => handleAddToCart()} 
  disabled={variant.inStock <= 0}
>
  {variant.inStock > 0 ? t("productInfo.addToCart") : t("productInfo.outOfStock")}
</button>
      </div>

      <div className="mt-4">
        <button
          onClick={toggleWishlist}
          className={`py-3 flex items-start cursor-pointer gap-2 transition-colors ${
            isWishlisted ? "text-red-600" : "border-none"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 transition-colors ${
              isWishlisted
                ? "text-red-600 fill-current"
                : "text-gray-400 fill-none"
            }`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={isWishlisted ? "0" : "2"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span className={isWishlisted ? "text-red-600" : "text-gray-500"}>
            {isWishlisted ? t("productInfo.wishlisted") : t("productInfo.addToWishlist")}
          </span>
        </button>
      </div>

      <div className="mb-8">
        <div className="mb-4 flex gap-2">
          <h3 className="font-semibold">{t("productInfo.color")}:</h3>
          <p className="text-gray-500">
            {variant.color?.[currentLang] || t("productInfo.noColor")} {/* تعديل من en إلى currentLang */}
          </p>
        </div>

        <div className="mb-4 flex gap-2">
          <h3 className="font-semibold">{t("productInfo.material")}:</h3>
          <p className="text-gray-500">
            {product.material?.[currentLang] || t("productInfo.noMaterial")} {/* تعديل من en إلى currentLang */}
          </p>
        </div>

        {product.categories?.sub?.tags &&
          product.categories.sub.tags.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Tags: </h3>
              <div className="flex flex-wrap gap-2">
                {product.categories.sub.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 hover:underline cursor-pointer transition-all duration-300 text-gray-800 text-sm px-3 py-1 capitalize font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

        <div className="mb-4 flex gap-2">
          <h3 className="font-semibold">Availability: </h3>
          <p className="text-gray-500">
            {variant.inStock > 0
              ? `In Stock (${variant.inStock} available)`
              : t("productInfo.outOfStock")}
          </p>
        </div>

        <div>
          <ProductTabs product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;

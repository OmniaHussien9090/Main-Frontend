import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { FaEye, FaHeart, FaShoppingBag } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, fetchCart } from "../../redux/cartActions";
import { toggleWishlistItem, fetchWishlist } from "../../redux/wishList";
import { toast } from "react-toastify";
import { api } from "../../axios/axios";

const ProductGrid = ({
  hasLoaded,
  currentVariants,
  filteredVariants,
  resetFilters,
}) => {
  const token = localStorage.getItem("token");
  const { t } = useTranslation("products");
  const currentLang = i18n.language;
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist?.items || []);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const cartCount = useSelector((state) => state.cart.items.length);

  // تحديث المفضلة عند تحميل الصفحة
  useEffect(() => {
    if (token) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, token]);

  // دالة إضافة للسلة
  const handleAddToCart = async (variant) => {
    // تحقق من حالة المخزون
    if (variant.inStock === false || variant.stock === 0) {
      toast.error(t("outOfStock") || "المنتج غير متوفر حالياً");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error(
        t("loginRequired") || "يجب تسجيل الدخول أولاً لإضافة المنتجات للسلة"
      );
      return;
    }
    try {
      await dispatch(
        addCartItem({
          product: {
            _id: variant.productId,
            finalPrice: variant.discountPrice || variant.price,
          },
          quantity: 1,
        })
      ).unwrap();
      toast.success(t("addedToCart"));
    } catch (error) {
      console.error("Error adding to cart:", error);
      if (
        error?.message === "Not enough stock available" ||
        error?.response?.data?.message === "Not enough stock available"
      ) {
        toast.error(t("outOfStock") || "المنتج غير متوفر حالياً");
      } else {
        toast.error(t("errorAddingToCart"));
      }
    }
  };

  // دالة إضافة للمفضلة
  const handleToggleWishlist = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error(
        t("loginRequired") || "يجب تسجيل الدخول أولاً لإضافة المنتجات للمفضلة"
      );
      return;
    }
    try {
      const isInWishlist = wishlist.some((item) => item._id === productId);
      await dispatch(toggleWishlistItem(productId)).unwrap();
      await dispatch(fetchWishlist());
      if (isInWishlist) {
        toast.success(t("removedFromWishlist"));
      } else {
        toast.success(t("addedToWishlist"));
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      toast.error(t("errorTogglingWishlist"));
    }
  };

  if (!hasLoaded) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col gap-4 animate-pulse">
            <div className="h-66.5 bg-gray-200 w-full mb-2"></div>
            <div className="h-6 bg-gray-200 w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 w-1/2 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredVariants.length > 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentVariants.map((variant) => (
          <div key={variant._id} className="flex flex-col gap-4">
            <div className="relative group">
              <Link
                to={`/shop/${variant.productId}`}
                state={{ variantId: variant._id }}
              >
                <img
                  src={variant.image || "/placeholder.jpg"}
                  className="h-66.5 w-full object-cover mb-2 transition-all duration-300"
                />
              </Link>

              {/* أيقونات تظهر عند hover */}
              <div className="absolute inset-0 bg-black/50 bg-opacity-20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart(variant);
                  }}
                  className="bg-white p-3 rounded-full hover:bg-green-500 hover:text-white transition-colors"
                  title={t("addToCart")}
                >
                  <FaShoppingBag />
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleToggleWishlist(variant.productId);
                  }}
                  className={`bg-white p-3 rounded-full transition-colors ${
                    wishlist.some((item) => item._id === variant.productId)
                      ? "text-red-500 hover:bg-red-100"
                      : "hover:bg-red-500 hover:text-white"
                  }`}
                  title={
                    wishlist.some((item) => item._id === variant.productId)
                      ? t("removeFromWishlist")
                      : t("addToWishlist")
                  }
                >
                  <FaHeart />
                </button>

                <Link
                  to={`/shop/${variant.productId}`}
                  state={{ variantId: variant._id }}
                  className="bg-white p-3 rounded-full hover:bg-green-500 hover:text-white transition-colors"
                  title={t("viewDetails")}
                >
                  <FaEye />
                </Link>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center">
              <h2 className="font-bold font-sans text-lg">
                {variant.name?.[currentLang] || "No name"}
              </h2>
              <div className="flex items-center gap-1">
                <RatingStars averageRating={variant.averageRating} />
                <span className="text-gray-500 text-xs">
                  ({variant.ratingCount})
                </span>
              </div>
              <div className="mt-2">
                <span className="text-gray-600 font-semibold">
                  $
                  {variant.discountPrice?.toFixed(2) ||
                    variant.price?.toFixed(2) ||
                    "0.00"}
                </span>
                {variant.discountPrice && (
                  <span className="text-gray-400 line-through ml-2">
                    ${variant.price?.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-gray-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {t("no_products_title")}
      </h3>
      <p className="text-gray-500 text-center max-w-md">
        {t("no_products_message")}
      </p>
      <button
        onClick={resetFilters}
        className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
      >
        {t("reset_filters")}
      </button>
    </div>
  );
};

export default ProductGrid;

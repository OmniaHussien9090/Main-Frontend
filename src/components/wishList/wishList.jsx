import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, toggleWishlistItem } from "../../redux/wishList";
import { addCartItem } from "../../redux/cartActions";
import { useTranslation } from "react-i18next";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";

function WishlistPage() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const loading = useSelector((state) => state.wishlist.loading);
  const error = useSelector((state) => state.wishlist.error);
  const { t, i18n } = useTranslation("wishlist");
  const currentLang = i18n.language;

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await dispatch(toggleWishlistItem(productId)).unwrap();
      toast.success(t("removed"));
    } catch (error) {
      toast.error(t("error"));
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const variant = product.variants[0];
      if (!variant) {
        toast.error(t("cart.noVariant"));
        return;
      }

      await dispatch(
        addCartItem({
          product: {
            _id: product._id,
            finalPrice: variant.discountPrice || variant.price,
          },
          quantity: 1,
        })
      ).unwrap();
      toast.success(t("cart.added"));
    } catch (error) {
      toast.error(t("cart.error"));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading wishlist: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 mt-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {t("title")}
        </h1>
        <p className="text-gray-600">
          {t("subtitle")}
        </p>
      </div>

      {!wishlistItems || wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="mb-4">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t("empty.title")}
          </h3>
          <p className="text-gray-500">
            {t("empty.message")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative">
                {product.variants?.[0]?.image && (
                  <img
                    src={product.variants[0].image}
                    alt={product.description?.[currentLang] || "Product"}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="absolute top-2 right-2">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                    {product.brand}
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveFromWishlist(product._id)}
                  className="absolute top-2 left-2 bg-white p-2 rounded-full hover:bg-red-50 transition-colors"
                  title={t("remove")}
                >
                  <FaHeart className="text-red-500 text-xl" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.variants[0].name?.[currentLang] || "No title"}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t("material")}: {product.material?.[currentLang] || "N/A"}
                </p>
                {product.variants?.[0] && (
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.variants[0].price?.toFixed(2) || "0.00"}
                    </span>
                    {product.variants[0].discountPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.variants[0].discountPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                )}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-colors flex items-center justify-center gap-2"
                >
                  <FaShoppingCart />
                  {t("cart.add")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;

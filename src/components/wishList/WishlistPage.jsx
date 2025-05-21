import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { removeFromWishlist, clearWishlist } from "../../redux/wishList";
import { useTranslation } from "react-i18next";

const WishlistPage = () => {
  const { t, i18n } = useTranslation("wishlist");
  const currentLang = i18n.language;
  const isRTL = currentLang === "ar";
  const dispatch = useDispatch();
  const { productsData } = useSelector((state) => state.wishlist);

  // Get unique products (no duplicates)
  const uniqueProducts = productsData.reduce((acc, product) => {
    const exists = acc.some(p => p.productId === product.productId);
    if (!exists) {
      acc.push(product);
    }
    return acc;
  }, []);

  const handleRemoveItem = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
  };

  return (
    <div 
      className={`container mx-auto px-4 sm:px-6 py-8 my-12 sm:my-20 ${isRTL ? 'text-right' : 'text-left'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Header Section */}
      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
        <div className="flex items-center order-2 sm:order-1">
          <Link
            to="/shop"
            className={`flex items-center text-gray-600 hover:text-black transition-all duration-300 group cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {isRTL ? (
              <FiArrowRight className="ml-2 sm:ml-3 transition-all duration-300 group-hover:translate-x-1" />
            ) : (
              <FiArrowLeft className="mr-2 sm:mr-3 transition-all duration-300 group-hover:-translate-x-1" />
            )}
            <span className="text-sm sm:text-base">{t("Back to Shop")}</span>
          </Link>
        </div>
        
        <h1 className="text-xl sm:text-2xl font-bold order-1 sm:order-2">{t("My Wishlist")}</h1>
        
        {uniqueProducts.length > 0 && (
          <button
            onClick={handleClearWishlist}
            className="text-red-500 hover:text-red-700 text-sm font-medium order-3"
          >
            {t("Clear All")}
          </button>
        )}
      </div>

      {/* Products Grid */}
      {uniqueProducts.length > 0 ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {uniqueProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative group aspect-square">
                <Link
                  to={`/shop/${product.productId}`}
                  state={{ variantId: product._id }}
                  className="block h-full"
                >
                  <img
                    src={product.image || "/placeholder.jpg"}
                    alt={product.name?.[currentLang] || "Product"}
                    className="w-full h-full object-cover"
                  />
                </Link>
                <div className={`absolute top-2 ${isRTL ? 'left-2' : 'right-2'}`}>
                  <button
                    onClick={() => handleRemoveItem(product._id)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-red-500 hover:text-white transition-colors"
                    aria-label={t("Remove from wishlist")}
                  >
                    <FiHeart className="text-red-500 fill-current" size={18} />
                  </button>
                </div>
              </div>
              
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-sm sm:text-base mb-1 line-clamp-2 min-h-[2.5rem]">
                  <Link
                    to={`/shop/${product.productId}`}
                    state={{ variantId: product._id }}
                    className="hover:text-orange-500 transition-colors"
                  >
                    {product.name?.[currentLang] || t("No name")}
                  </Link>
                </h3>
                
                <div className={`flex flex-col sm:flex-row sm:items-center justify-between mt-2 gap-1 sm:gap-2 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                  <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} items-center gap-2`}>
                    <span className="text-sm sm:text-base font-bold text-gray-800">
                      $
                      {product.discountPrice?.toFixed(2) ||
                        product.price?.toFixed(2) ||
                        "0.00"}
                    </span>
                    {product.discountPrice && (
                      <span className="text-xs sm:text-sm text-gray-400 line-through">
                        ${product.price?.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <button 
                    className={`bg-black text-white px-2 sm:px-3 py-1 text-xs sm:text-sm rounded hover:bg-gray-800 transition-colors flex items-center justify-center cursor-pointer ${
                      isRTL ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <FiShoppingCart className={isRTL ? 'ml-1' : 'mr-1'} size={14} />
                    {t("Add to Cart")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-8 sm:py-12">
          <FiHeart className="mx-auto text-gray-400 text-4xl sm:text-5xl mb-4" />
          <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
            {t("No Wishlist Items Found")}
          </h3>
          <p className="text-sm sm:text-base text-gray-500 mb-6 px-4">
            {t("Empty Wishlist")}
          </p>
          <div className="flex justify-center">
            <Link
              to="/shop"
              className="px-4 py-2 bg-black text-white text-sm sm:text-base rounded-md hover:bg-gray-800 transition-colors inline-block"
            >
              {t("Continue Shopping")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
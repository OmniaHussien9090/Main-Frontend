import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  removeCartItem,
  updateCartQuantity,
  clearCartItems,
} from "../redux/cartActions";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
const Cart = () => {
  const { t } = useTranslation("cart");
  const currentLang = i18n.language;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;

    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [dispatch]);

  const total = items.reduce(
    (acc, item) => acc + item.priceAtAddition * item.quantity,
    0
  );

  const deliveryFee = 50;
  const discount = total * 0.1;
  const finalTotal = total - discount + deliveryFee;

  return (
    <div className="container mx-auto px-4 py-8 mt-8">
      <h2 className="text-3xl mb-6 mt-8 text-center font-bold text-gray-600">
        {t("title")}
      </h2>

      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "40vh",
          }}
        >
          <span className="loading loading-spinner text-secondary"></span>
        </div>
      )}
      {error && <p className="text-red-500">{error.message || t("error")}</p>}

      {!loading && items.length === 0 && (
        <div className="text-center mt-10">
          <p className="text-xl mb-4 mt-8">{t("empty")}</p>
          <Link
            to="/shop"
            className="inline-block bg-gray-400 text-white px-6 py-3 rounded-full mb-6 hover:bg-gray-500"
          >
            {t("continueShopping")}
          </Link>
        </div>
      )}

      {items.length > 0 && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow p-4">
              {/* Desktop Table View - Improved sizing */}
              <div className="hidden md:block max-w-3xl mx-auto">
                <table className="w-full text-left text-sm sm:text-base table-fixed">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 w-[45%]">{t("products")}</th>
                      <th className="w-[25%]">{t("quantity")}</th>
                      <th className="w-[20%]">{t("total")}</th>
                      <th className="w-[10%]">{t("actions")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item._id} className="border-b">
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={item.productId.variants[0].image}
                              className="w-14 h-14 object-contain rounded shrink-0"
                            />
                            <div className="flex flex-col overflow-hidden">
                              <h3 className="font-medium truncate">
                                {item.productId.variants[0].name[currentLang]}
                              </h3>
                              <p className="text-xs text-gray-500 truncate">
                                {t("color")}:{" "}
                                {item.productId.variants[0].color[currentLang]}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center border rounded-full w-fit px-1 py-1">
                            <button
                              onClick={() =>
                                dispatch(
                                  updateCartQuantity({
                                    itemId: item._id,
                                    type: "dec",
                                    currentQuantity: item.quantity,
                                  })
                                )
                              }
                              className="px-1.5"
                            >
                              <FaMinus size={10} />
                            </button>
                            <span className="px-2 font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                dispatch(
                                  updateCartQuantity({
                                    itemId: item._id,
                                    type: "inc",
                                    currentQuantity: item.quantity,
                                  })
                                )
                              }
                              className="px-1.5"
                            >
                              <FaPlus size={10} />
                            </button>
                          </div>
                        </td>
                        <td className="font-medium text-sm">
                          {(item.priceAtAddition * item.quantity).toFixed(2)}{" "}
                          USD
                        </td>
                        <td>
                          <button
                            onClick={() => dispatch(removeCartItem(item._id))}
                            className="text-black hover:text-red-700"
                          >
                            <FaTrash size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile and Tablet Card View */}
              <div className="md:hidden space-y-4 mt-2">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="relative bg-white shadow-md rounded-xl p-4 gap-4 w-full max-w-2xl"
                  >
                    {/* Delete button as X icon in top-right corner */}
                    <button
                      onClick={() => dispatch(removeCartItem(item._id))}
                      className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 hover:bg-red-100 text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      {/* الصورة */}
                      <img
                        src={item.productId.variants[0].image}
                        alt={item.productId.variants[0].name[currentLang]}
                        className="w-full sm:w-32 h-32 object-cover rounded-lg"
                      />

                      {/* التفاصيل */}
                      <div className="flex flex-col justify-between flex-1 w-full">
                        <div>
                          <h3 className="text-base font-semibold text-gray-800">
                            {item.productId.variants[0].name[currentLang]}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {t("color")}:{" "}
                            {item.productId.variants[0].color[currentLang]}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-2">
                          {/* التحكم في الكمية */}
                          <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 bg-gray-50 w-fit text-sm">
                            <button
                              onClick={() =>
                                dispatch(
                                  updateCartQuantity({
                                    itemId: item._id,
                                    type: "dec",
                                    currentQuantity: item.quantity,
                                  })
                                )
                              }
                              className="px-2 text-gray-500 hover:text-green-600"
                            >
                              <FaMinus className="text-sm" />
                            </button>
                            <span className="px-2 font-medium text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                dispatch(
                                  updateCartQuantity({
                                    itemId: item._id,
                                    type: "inc",
                                    currentQuantity: item.quantity,
                                  })
                                )
                              }
                              className="px-2 text-gray-500 hover:text-green-600"
                            >
                              <FaPlus className="text-sm" />
                            </button>
                          </div>

                          {/* السعر */}
                          <div className="text-lg font-bold text-green-600">
                            {(item.priceAtAddition * item.quantity).toFixed(2)}{" "}
                            USD
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => dispatch(clearCartItems())}
                  className="px-6 py-2 text-white rounded-full hover:bg-red-700 transition-colors duration-200"
                  style={{ backgroundColor: "rgb(151, 158, 165)" }}
                >
                  {t("clearCart")}
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col justify-between h-auto">
            <div>
              <h3 className="text-lg font-bold mb-4">{t("orderSummary")}</h3>

              <div className="flex flex-col gap-2 mb-4 w-full">
                <input
                  type="text"
                  placeholder={t("discountVoucher")}
                  className="w-full border rounded px-3 py-2"
                />
                <button
                  className="px-4 py-2 text-white rounded w-full transition-colors duration-200"
                  style={{ backgroundColor: "rgb(151, 158, 165)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgb(132, 139, 146)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgb(151, 158, 165)")
                  }
                >
                  {t("apply")}
                </button>
              </div>

              <div className="space-y-2 text-sm pt-3 pb-3">
                <div className="flex justify-between mb-2">
                  <span>{t("subTotal")}</span>
                  <span>{total.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>{t("discount")}</span>
                  <span>-{discount.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>{t("deliveryFee")}</span>
                  <span>{deliveryFee.toFixed(2)} USD</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                  <span>{t("finalTotal")}</span>
                  <span>{finalTotal.toFixed(2)} USD</span>
                </div>
              </div>

              <div className="mt-3 text-sm text-gray-600">
                <label className="inline-flex items-start gap-1">
                  <input type="checkbox" className="mt-1" defaultChecked />
                  <span>
                    {t("warrantyText")}
                    <a href="#" className="ml-1 text-blue-600 underline">
                      {t("warrantyDetails")}
                    </a>
                  </span>
                </label>
              </div>
            </div>

            <button
              className="mt-4 w-full py-3 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-gray-600"
              style={{ backgroundColor: "rgb(132, 139, 146)" }}
              onClick={() =>
                navigate("/checkout", { state: { finalTotal, items } })
              }
            >
              {t("checkoutNow")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

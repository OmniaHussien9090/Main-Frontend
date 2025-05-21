import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { ToastContainer, toast } from "react-toastify";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearCartItems } from "../redux/cartActions";

const Checkout = () => {
  const { t, i18n } = useTranslation("checkout");
  const currentLang = i18n.language;
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [showMoreVisible, setShowMoreVisible] = useState(false);
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    shipping: "standard",
    payment: "cash_on_delivery",
    country: "",
  });

  const { state } = useLocation();

  // احسب subtotal من المنتجات القادمة من السلة
  const subtotal =
    state?.items?.reduce(
      (acc, item) => acc + item.priceAtAddition * item.quantity,
      0
    ) || 0;

  const shippingCost = formData.shipping === "standard" ? 7 : 10;
  const finalTotal = subtotal + shippingCost;

  useEffect(() => {
    const checkScrollable = () => {
      const scrollEl = scrollRef.current;
      if (scrollEl) {
        setShowMoreVisible(scrollEl.scrollHeight > scrollEl.clientHeight);
      }
    };

    checkScrollable();
  }, [state?.items]);

  const handleScroll = () => {
    const scrollTop = scrollRef.current.scrollTop;
    setScrolled(scrollTop > 0);
  };
  const handleShowMore = () => {
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (val) => {
    setFormData({
      ...formData,
      country: val,
      state: "",
      city: "",
    });
  };

  const handleRegionChange = (val) => {
    setFormData({
      ...formData,
      state: val,
      city: "",
    });
  };

  const placeOrder = async (method, paypalOrderId = null) => {
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.zip.trim() ||
      !formData.phone.trim() ||
      !formData.country.trim()
    ) {
      toast.error("Please fill in all required address fields.");
      return;
    }

    try {
      const userId = "681d0d6a477147ec0fc838cc";

      const shippingAddress = {
        fullName: `${formData.firstName} ${formData.lastName}`,
        street: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.zip,
        phone: formData.phone,
        country: formData.country,
      };

      const products = state.items.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        priceAtPurchase: item.priceAtAddition, // أو item.price حسب ما هو متوفر
      }));

      const body = {
        shippingAddress,
        paymentMethod: method,
        products, // أضف المنتجات هنا
      };

      if (method === "paypal" && paypalOrderId) {
        body.paypalOrderId = paypalOrderId;
      }
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3000/orders", body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(clearCartItems());
      navigate("/orders");
    } catch (error) {
      console.error("Order failed:", error.response?.data || error.message);
      toast.error("Failed to place order. Please try again.");
    }
  };

  const toggleMobileSummary = () => {
    setIsMobileSummaryOpen(!isMobileSummaryOpen);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <style jsx>{`
        input,
        select {
          height: 42px !important;
          box-sizing: border-box;
        }

        .country-dropdown,
        .region-dropdown {
          height: 42px !important;
        }

        /* Fix for CountryDropdown and RegionDropdown components */
        .country-dropdown,
        .region-dropdown {
          height: 42px !important;
          appearance: auto !important;
          padding-right: 30px !important;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e") !important;
          background-position: right 0.5rem center !important;
          background-repeat: no-repeat !important;
          background-size: 1.5em 1.5em !important;
          width: 100% !important;
          border-radius: 0.375rem !important;
          border: 1px solid #d1d5db !important;
          padding: 0.5rem 1rem !important;
          font-size: 1rem !important;
          line-height: 1.5 !important;
          color: #374151 !important;
          background-color: #fff !important;
          box-sizing: border-box !important;
          max-width: 100% !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          white-space: nowrap !important;
        }

        /* Fix for dropdown container to maintain consistent width */
        .dropdown-container {
          width: 100% !important;
          position: relative !important;
          display: block !important;
        }

        /* Focus state */
        .country-dropdown:focus,
        .region-dropdown:focus {
          outline: none !important;
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25) !important;
        }
      `}</style>
      <div className="flex flex-col lg:flex-row ">
        {/* Order Summary - Mobile (Fixed Bottom Bar) */}
        <div className="lg:hidden">
          {/* Mobile Header Bar */}
          <div className="mobile-summary-header">
            <div className="flex justify-evenly items-center p-4">
              <div>
                <span className="font-bold">{t("total")}: </span>
                <span className="text-blue-600 font-bold">
                  $
                  {(
                    finalTotal + (formData.shipping === "standard" ? 7 : 10)
                  ).toFixed(2)}
                </span>
              </div>
              <button
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={toggleMobileSummary}
              >
                {t("order_summary")}{" "}
                {isMobileSummaryOpen ? <FaChevronDown /> : <FaChevronUp />}
              </button>
            </div>
          </div>

          {/* Mobile Expandable Content */}
          <div
            className={`mobile-summary-content p-6 transition-all duration-300 ease-in-out overflow-hidden ${
              isMobileSummaryOpen ? "max-h-[1000px]" : "max-h-0"
            }`}
          >
            <div className="relative mt-6">
              {scrolled && (
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gray-300 z-10" />
              )}

              {/* Scrollable content */}
              <div
                className="space-y-2 overflow-y-auto p-5"
                style={{ maxHeight: "30vh" }}
                ref={scrollRef}
                onScroll={handleScroll}
              >
                {state?.items?.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-4">
                      <div style={{ position: "relative" }}>
                        <img
                          src={item.productId.variants[0].image}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
                        />
                        <p
                          style={{
                            width: "20px",
                            position: "absolute",
                            borderRadius: "50%",
                            backgroundColor: "rgba(109, 107, 105, 0.8)",
                            right: "-10px",
                            top: "-10px",
                            color: "white",
                            textAlign: "center",
                            fontSize: "0.8rem",
                          }}
                        >
                          {item.quantity}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm sm:text-base">
                          {item.productId.variants[0].name?.[currentLang]}
                        </p>
                        <p className="text-gray-500 text-xs sm:text-sm">
                          ${(item.priceAtAddition * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* زر show more */}
              {showMoreVisible && !scrolled && (
                <button
                  onClick={handleShowMore}
                  className="absolute  bottom-0 left-1/2 -translate-x-1/2 text-white text-sm flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "rgb(109, 107, 105,90%)",
                    width: "120px",
                    height: "35px",
                    borderRadius: "20px",
                    maxHeight: "10vh",
                  }}
                >
                  {t("show_more")} <FaChevronDown size={12} />
                </button>
              )}
            </div>

            {/* كود الخصم */}
            <div className="mt-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t("discount_placeholder")}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition h-[42px]"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition text-sm font-medium">
                  {t("apply")}
                </button>
              </div>
            </div>

            {/* ملخص الأسعار */}
            <div className="mt-6 space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>{t("subtotal")}</span>
                <span className="font-medium">${finalTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("shipping")}</span>
                <span className="font-medium">
                  {formData.shipping === "standard"
                    ? t("standard_shipping_price")
                    : t("express_shipping_price")}
                </span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>{t("total")}</span>
                  <span className="text-blue-600">
                    $
                    {(
                      finalTotal + (formData.shipping === "standard" ? 7 : 10)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                formData.payment === "cash_on_delivery" &&
                placeOrder("cash_on_delivery")
              }
              className={`w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition ${
                formData.payment === "paypal" ? "hidden" : "block"
              }`}
            >
              {t("place_order")}
            </button>
          </div>
        </div>
        {/* --- الجزء الرئيسي --- */}
        <div className="bg-gray-50 min-h-screen py-2 lg:basis-2/3 flex flex-col">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800 ">
            {t("checkout")}
          </h1>
          <div className="flex flex-col items-center justify-center w-full ">
            <div className="w-full lg:w-4/5  bg-white rounded-lg shadow-sm p-6">
              <div className="mx-auto w-full max-w-[200px] md:max-w-[250px]  mb-6">
                <img
                  className="h-full w-full object-contain"
                  src="https://help.zazzle.com/hc/article_attachments/360010513393"
                  alt="Checkout"
                />
              </div>
              <h2 className="text-xl font-semibold mb-6 text-gray-700 border-b pb-2">
                {t("delivery_address")}
              </h2>
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("first_name")}
                    </label>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder={t("first_name")}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition h-[42px]"
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("last_name")}
                    </label>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder={t("last_name")}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition h-[42px]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("address")}
                  </label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder={t("address_placeholder")}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition h-[42px]"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div
                    className="w-full sm:w-1/2 dropdown-container"
                    style={{ width: "50%" }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("country")}
                    </label>
                    <div style={{ width: "100%", position: "relative" }}>
                      <CountryDropdown
                        value={formData.country}
                        onChange={handleCountryChange}
                        classes="country-dropdown"
                        defaultOptionLabel={t("select_country")}
                      />
                    </div>
                  </div>
                  <div
                    className="w-full sm:w-1/2 dropdown-container"
                    style={{ width: "50%" }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("state_region")}
                    </label>
                    <div style={{ width: "100%", position: "relative" }}>
                      <RegionDropdown
                        country={formData.country}
                        value={formData.state}
                        onChange={handleRegionChange}
                        classes="region-dropdown"
                        blankOptionLabel={t("no_state")}
                        defaultOptionLabel={t("select_state")}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="w-full sm:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("city")}
                    </label>
                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder={t("city")}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition h-[42px]"
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("zip_code")}
                    </label>
                    <input
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      placeholder={t("zip_code")}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition h-[42px]"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("phone_number")}
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t("phone_number")}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition h-[42px]"
                  />
                </div>
              </div>
              {/* Shipping Method */}
              <div className="mt-6">
                <h3 className="font-semibold mb-2">{t("shipping_method")}</h3>
                <div className="space-y-2">
                  <label className="flex items-center justify-between border rounded px-4 py-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="shipping"
                        value="standard"
                        checked={formData.shipping === "standard"}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <p>{t("standard_shipping")}</p>
                    </div>
                    <span>{t("standard_shipping_price")}</span>
                  </label>
                  <label className="flex items-center justify-between border rounded px-4 py-2">
                    <div className="flex items-center ">
                      <input
                        type="radio"
                        name="shipping"
                        value="express"
                        checked={formData.shipping === "express"}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <p>{t("express_shipping")}</p>
                    </div>
                    <span>{t("express_shipping_price")}</span>
                  </label>
                </div>
              </div>
              {/* Payment Method */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">
                  {t("payment")}
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center border border-gray-200 rounded-md px-4 py-3 hover:bg-gray-50 transition cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="cash_on_delivery"
                      checked={formData.payment === "cash_on_delivery"}
                      onChange={handleChange}
                      className="mr-3 h-4 w-4 text-blue-600"
                    />
                    <div>
                      <p className="font-medium">{t("cash_on_delivery")}</p>
                      <p className="text-sm text-gray-500">
                        {t("pay_on_receive")}
                      </p>
                    </div>
                  </label>
                  <label className="flex items-center border border-gray-200 rounded-md px-4 py-3 hover:bg-gray-50 transition cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={formData.payment === "paypal"}
                      onChange={handleChange}
                      className="mr-3 h-4 w-4 text-blue-600"
                    />
                    <div>
                      <p className="font-medium">{t("paypal")}</p>
                      <p className="text-sm text-gray-500">
                        {t("pay_with_paypal")}
                      </p>
                    </div>
                  </label>
                </div>
                {/* PayPal */}
                <div
                  className={`mt-4 p-4 border border-gray-200 rounded-md bg-gray-50 ${
                    formData.payment === "paypal" ? "block" : "hidden"
                  }`}
                >
                  <PayPalScriptProvider
                    options={{
                      "client-id":
                        "AQVBWA96vQKJBbds8eSIiSe1RUvs_VezGTW_f1JU2nYNKNm7IIMYnblA8g_ujmdKDIf-TJNohAOgDvG1",
                      currency: "USD",
                    }}
                  >
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      createOrder={(data, actions) => {
                        const shippingCost =
                          formData.shipping === "standard" ? 7 : 10;
                        const total = (finalTotal + shippingCost).toFixed(2);

                        console.log("PayPal total:", total);

                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: total.toString(),
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={async (data, actions) => {
                        try {
                          const details = await actions.order.capture();
                          toast.success(
                            `Transaction completed by ${details.payer.name.given_name}`
                          );
                          await placeOrder("paypal", data.orderID);
                          navigate("/orders");
                        } catch (err) {
                          console.error("PayPal capture error:", err);
                          toast.error("An error occurred with PayPal payment.");
                        }
                      }}
                      onError={(err) => {
                        console.error("PayPal error:", err);
                        toast.error("An error occurred with PayPal payment.");
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* --- ملخص الطلب الجانبي --- */}
        <div
          className="p-8 hidden lg:block bg-gray-200 w-full lg:basis-1/3 lg:sticky"
          style={{ height: "auto", maxHeight: "100vh", top: "0" }}
        >
          <h2 className="text-xl font-semibold mb-4">{t("furniture")}</h2>
          <div className="relative">
            {scrolled && (
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gray-300 z-10" />
            )}
            <div
              className="space-y-4 overflow-y-auto p-5"
              style={{ maxHeight: "30vh" }}
              ref={scrollRef}
              onScroll={handleScroll}
            >
              {state?.items?.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center space-x-4">
                    <div style={{ position: "relative" }}>
                      <img
                        src={item.productId.variants[0].image}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
                      />
                      <p
                        style={{
                          width: "20px",
                          position: "absolute",
                          borderRadius: "50%",
                          backgroundColor: "rgba(109, 107, 105, 0.8)",
                          right: "-10px",
                          top: "-10px",
                          color: "white",
                          textAlign: "center",
                          fontSize: "0.8rem",
                        }}
                      >
                        {item.quantity}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm sm:text-base">
                        {item.productId.variants[0].name?.[currentLang]}
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        ${(item.priceAtAddition * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {showMoreVisible && !scrolled && (
              <button
                onClick={handleShowMore}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 text-white text-sm flex items-center justify-center gap-2"
                style={{
                  backgroundColor: "rgb(109, 107, 105,90%)",
                  width: "120px",
                  height: "35px",
                  borderRadius: "20px",
                }}
              >
                {t("show_more")} <FaChevronDown size={12} />
              </button>
            )}
          </div>
          <div className="mt-6">
            <div className="relative">
              <input
                type="text"
                placeholder={t("discount_placeholder")}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition h-[42px]"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition text-sm font-medium">
                {t("apply")}
              </button>
            </div>
          </div>
          <div className="mt-6 space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>{t("subtotal")}</span>
              <span className="font-medium">${finalTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("shipping")}</span>
              <span className="font-medium">
                {formData.shipping === "standard"
                  ? t("standard_shipping_price")
                  : t("express_shipping_price")}
              </span>
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between font-bold text-lg">
                <span>{t("total")}</span>
                <span className="text-blue-600">
                  $
                  {(
                    finalTotal + (formData.shipping === "standard" ? 7 : 10)
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() =>
              formData.payment === "cash_on_delivery" &&
              placeOrder("cash_on_delivery")
            }
            className={`w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition ${
              formData.payment === "paypal" ? "hidden" : "block"
            }`}
          >
            {t("place_order")}
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;

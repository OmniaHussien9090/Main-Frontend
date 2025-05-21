import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { api } from "../axios/axios";
 
const OrderItems = () => {
  const { t, i18n } = useTranslation("orderitems");
  const currentLang = i18n.language;
 
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
 
  const orderId = new URLSearchParams(location.search).get("orderId");
 
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/orders/${orderId}`);
        setOrder(data.order);
      } catch (error) {
        console.error("Error fetching order", error);
      } finally {
        setLoading(false);
      }
    };
 
    if (orderId) fetchOrder();
  }, [orderId]);
 
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
 
  if (!order) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {t("orderNotFound")}
      </div>
    </div>
  );
 
  const address = order.shippingAddress;
  const products = order.products;
 
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-6">
        <button
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors duration-200"
          onClick={() => navigate(-1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          {t("back")}
        </button>
      </div>
 
      <h1 className="text-2xl font-bold text-center mb-8">{t("orderItems")}</h1>
 
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shipping Address Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 h-full transition-all hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b flex items-center gap-2 text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {t("shippingDetails")}
            </h2>
            <div className="space-y-4">
              <div className="flex flex-wrap items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-700 w-1/3">{t("name")}:</span>
                <span className="w-2/3 text-gray-800">{address.fullName}</span>
              </div>
              <div className="flex flex-wrap items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-700 w-1/3">{t("address")}:</span>
                <span className="w-2/3 text-gray-800">{address.street}</span>
              </div>
              <div className="flex flex-wrap items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-700 w-1/3">{t("postalCode")}:</span>
                <span className="w-2/3 text-gray-800">{address.postalCode}</span>
              </div>
              <div className="flex flex-wrap items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-700 w-1/3">{t("country")}:</span>
                <span className="w-2/3 text-gray-800">{address.country}</span>
              </div>
              <div className="flex flex-wrap items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-700 w-1/3">{t("state")}:</span>
                <span className="w-2/3 text-gray-800">{address.state}</span>
              </div>
              <div className="flex flex-wrap items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-700 w-1/3">{t("city")}:</span>
                <span className="w-2/3 text-gray-800">{address.city}</span>
              </div>
            </div>
          </div>
        </div>
 
        {/* Order Items Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            {/* Desktop Table - Hidden on Mobile */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-sm font-semibold">{t("#")}</th>
                    <th className="p-3 text-sm font-semibold">{t("image")}</th>
                    <th className="p-3 text-sm font-semibold">{t("productName")}</th>
                    <th className="p-3 text-sm font-semibold">{t("date")}</th>
                    <th className="p-3 text-sm font-semibold">{t("price")}</th>
                    <th className="p-3 text-sm font-semibold">{t("quantity")}</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item, index) => {
                    const variant = item.productId?.variants?.[0];
                    return (
                      <tr key={item._id} className="border-t hover:bg-gray-50">
                        <td className="p-3 text-sm">{index + 1}</td>
                        <td className="p-3">
                          <div className="w-16 h-16 rounded overflow-hidden">
                            <img
                              src={variant?.image}
                              alt={variant?.name?.[currentLang]}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="p-3 text-sm">{variant?.name?.[currentLang]}</td>
                        <td className="p-3 text-sm">
                          {new Date(order.createdAt).toLocaleDateString(
                            currentLang
                          )}
                        </td>
                        <td className="p-3 text-sm font-medium">${item.priceAtPurchase}</td>
                        <td className="p-3 text-sm text-center">{item.quantity}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
           
            {/* Mobile Cards - Visible only on Mobile */}
            <div className="md:hidden">
              <div className="bg-gray-100 p-3 border-b">
                <h3 className="font-semibold text-sm">{t("orderItems")}</h3>
              </div>
              <div className="divide-y">
                {products.map((item, index) => {
                  const variant = item.productId?.variants?.[0];
                  return (
                    <div key={item._id} className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <div className="w-20 h-20 rounded overflow-hidden">
                            <img
                              src={variant?.image}
                              alt={variant?.name?.[currentLang]}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -top-2 -right-2 bg-gray-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{variant?.name?.[currentLang]}</p>
                          <div className="mt-2 space-y-1 text-sm text-gray-600">
                            <p className="flex justify-between">
                              <span>{t("id")}:</span>
                              <span>{index + 1}</span>
                            </p>
                            <p className="flex justify-between">
                              <span>{t("date")}:</span>
                              <span>{new Date(order.createdAt).toLocaleDateString(currentLang)}</span>
                            </p>
                            <p className="flex justify-between font-medium">
                              <span>{t("price")}:</span>
                              <span>${item.priceAtPurchase}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default OrderItems;
 
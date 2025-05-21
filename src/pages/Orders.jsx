import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import {api} from "../axios/axios";
 
function Orders() {
  const { t } = useTranslation("orders");
  const currentLang = i18n.language;
  const [loading, setLoading] = useState(true);
 
  const navigate = useNavigate();
 
  const [groupedOrders, setGroupedOrders] = useState({
    pending: [],
    shipped: [],
    delivered: [],
    cancelled: [],
  });
 
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await api.get("/orders");
        setGroupedOrders(res.data.groupedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
 
    fetchOrders();
  }, []);
 
  const handleViewOrder = (orderId) => {
    navigate(`/orderitems?orderId=${orderId}`);
  };
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
 
  const renderTable = (orders, titleKey) => {
    if (orders.length === 0) return null;
 
    return (
      <div className="mb-10 mt-10 p-4 lg:p-12">
        <h2 className="text-2xl mb-4">{t(titleKey)}</h2>
       
        {/* عرض الجدول للشاشات الكبيرة فقط (أكبر من 1024px) */}
        <div className="hidden lg:block overflow-x-auto rounded-lg shadow">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>{t("orderId")}</th>
                <th>{t("date")}</th>
                <th>{t("totalPrice")}</th>
                <th>{t("quantity")}</th>
                <th>{t("status")}</th>
                <th>{t("payment")}</th>
                <th>{t("action")}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="hover">
                  {/* محتوى الصفوف الحالي */}
                  <th>{index + 1}</th>
                  <td className="truncate max-w-[100px]">{order._id}</td>
                  <td>
                    {new Date(order.createdAt).toLocaleDateString(currentLang)}
                  </td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.products.reduce(
                      (acc, item) => acc + item.quantity,
                      0
                    )}
                  </td>
                  <td>
                    <span className={` ${getStatusColor(order.status)}`}>
                      {t(order.status)}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`text ${
                        order.paymentStatus === "paid"
                          ? "text-success"
                          : "text-error"
                      }`}
                    >
                      {t(order.paymentStatus)}
                    </span>
                  </td>
                  <td>
                    <button
                      aria-label={`View order ${order._id}`}
                      className="btn btn-sm bg-gray-300 hover:bg-gray-400 transition-all duration-200"
                      onClick={() => handleViewOrder(order._id)}
                    >
                      {t("view")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       
        {/* عرض البطاقات للشاشات المتوسطة (640px - 1024px) */}
        <div className="hidden sm:grid lg:hidden grid-cols-2 gap-4">
          {orders.map((order, index) => (
            <div key={order._id} className="bg-white p-4 rounded-lg shadow flex flex-col h-full">
              <div className="flex justify-between items-center mb-3 border-b pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">#{index + 1}</span>
                  <span className="text-gray-500 text-sm truncate max-w-[120px]">{order._id}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusBgColor(order.status)}`}>
                  {t(order.status)}
                </span>
              </div>
             
              <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-3 text-sm mb-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("date")}:</span>
                  <span className="font-medium">{new Date(order.createdAt).toLocaleDateString(currentLang)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("totalPrice")}:</span>
                  <span className="font-medium">${order.totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("quantity")}:</span>
                  <span className="font-medium">{order.products.reduce((acc, item) => acc + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("payment")}:</span>
                  <span className={`font-medium ${order.paymentStatus === "paid" ? "text-success" : "text-error"}`}>
                    {t(order.paymentStatus)}
                  </span>
                </div>
              </div>
             
              <button
                className="w-full btn btn-sm bg-gray-300 hover:bg-gray-400 transition-all duration-200 mt-auto"
                onClick={() => handleViewOrder(order._id)}
              >
                {t("view")}
              </button>
            </div>
          ))}
        </div>
       
        {/* عرض البطاقات للشاشات الصغيرة (أقل من 640px) */}
        <div className="grid grid-cols-1 gap-4 sm:hidden">
          {orders.map((order, index) => (
            <div key={order._id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">#{index + 1}</span>
                <span className={getStatusColor(order.status)}>
                  {t(order.status)}
                </span>
              </div>
             
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                  <p className="text-gray-500">{t("orderId")}</p>
                  <p className="truncate max-w-[150px]">{order._id}</p>
                </div>
                <div>
                  <p className="text-gray-500">{t("date")}</p>
                  <p>{new Date(order.createdAt).toLocaleDateString(currentLang)}</p>
                </div>
                <div>
                  <p className="text-gray-500">{t("totalPrice")}</p>
                  <p>${order.totalPrice}</p>
                </div>
                <div>
                  <p className="text-gray-500">{t("quantity")}</p>
                  <p>{order.products.reduce((acc, item) => acc + item.quantity, 0)}</p>
                </div>
                <div>
                  <p className="text-gray-500">{t("payment")}</p>
                  <p className={order.paymentStatus === "paid" ? "text-success" : "text-error"}>
                    {t(order.paymentStatus)}
                  </p>
                </div>
              </div>
             
              <button
                className="w-full btn btn-sm bg-gray-300 hover:bg-gray-400 transition-all duration-200"
                onClick={() => handleViewOrder(order._id)}
              >
                {t("view")}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
 
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-warning";
      case "shipped":
        return "text-info";
      case "delivered":
        return "text-success";
      case "cancelled":
        return "text-error";
      default:
        return "text-ghost";
    }
  };
 
  // إضافة دالة جديدة للحصول على لون خلفية الحالة
  const getStatusBgColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
 
  return (
    <div className="p-6">
      {renderTable(groupedOrders.pending, "pendingOrders")}
      {renderTable(groupedOrders.shipped, "shippedOrders")}
      {renderTable(groupedOrders.delivered, "deliveredOrders")}
      {renderTable(groupedOrders.cancelled, "cancelledOrders")}
    </div>
  );
}
 
export default Orders;
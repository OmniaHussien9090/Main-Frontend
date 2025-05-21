import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");
  const { t, i18n } = useTranslation("productdetails");

  const tabs = ["description", "additional", "preview"];

  return (
    <div className="mt-12">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 text-sm ${
              activeTab === tab
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {t(`productTabs.${tab}`)}
          </button>
        ))}
      </div>

      <div className="py-4">
        {activeTab === "description" && (
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-line">
              {product.description?.[i18n.language] || t("productTabs.noDescription")}
            </p>
          </div>
        )}

        {activeTab === "additional" && (
          <div className="flex justify-center">
            <p className="text-gray-500">{t("productTabs.noAdditional")}</p>
          </div>
        )}

        {activeTab === "preview" && (
          <div className="flex justify-center">
            <p className="text-gray-500">{t("productTabs.noPreview")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;

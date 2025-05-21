import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
 
const Sidebar = () => {
  const { t } = useTranslation("profileuser");
 
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 " style={{ background: "#b9b9b9" }}>
        <h2 className="text-xl font-bold text-gray-700 px-4 py-2">
          {t("userMenu")}
        </h2>
      </div>
 
      <nav className="p-4">
        <div className="space-y-2">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-gray-100 text-gray-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              {t("profileOverview")}
            </div>
          </NavLink>
         
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-500 text-white font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
              {t("myOrders")}
            </div>
          </NavLink>
         
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-500 text-white font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <div className="flex items-center gap-3 ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              {t("wishlist")}
            </div>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};
 
export default Sidebar;
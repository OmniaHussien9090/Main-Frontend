import Sidebar from "../components/sidebar/Sidebar";
import ProfileForm from "../components/profileForm/ProfileForm";
import { useTranslation } from "react-i18next";
 
const ProfilePage = () => {
  const { t } = useTranslation("profileuser");
 
  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="container mx-auto px-4 py-8 ">
        <div className="flex flex-col lg:flex-row gap-6 mt-10">
          {/* Sidebar - Full width on mobile, sidebar on desktop */}
          <div className="w-full lg:w-64 flex-shrink-0 mt-10">
            <Sidebar />
          </div>
 
          {/* Main Content */}
          <main className="flex-1 mt-10">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Header with gradient background */}
              <div className="px-6 py-4 " style={{ background: "#b9b9b9" }}>
                <h2 className="text-2xl font-bold text-gray-700">
                  {t("profileOverviewTitle")}
                </h2>
                <p className="text-gray-600 mt-1 text-xl">
                  {t("generalInfoTitle")}
                </p>
              </div>
 
              {/* Profile Form Section */}
              <div className="p-6">
                <ProfileForm />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
 
export default ProfilePage;
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Navbar from "./components/navbar/navbar.jsx";
import Footer from "./components/footer/footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Orders from "./pages/Orders.jsx";
import OrderItems from "./pages/OrderItems.jsx";
import SignIn from "./components/SignUp/signIn.jsx";
import SignUp from "./components/SignUp/signUp.jsx";
import ProfileUser from "./pages/ProfileUser.jsx";
import ChangePassword from "./pages/ChangePassword";
import Products from "./components/products/products.jsx";
import { fetchCart } from "./redux/cartActions";
import ProductDetails from "./components/products/ProductDetails/ProductDetails.jsx";
import Blog from "./components/blog/BlogPosts/Blog.jsx";
import PostDetails from "./components/blog/PostDetailsPage/PostDetails.jsx";
import "./i18n";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import { SearchProvider } from "./searchContext/SearchContext.jsx";
import ForgetPass from "./components/SignUp/forgetPass.jsx";
import NotFound from "./components/NotFound/notFound.jsx";
import WishlistPage from "./components/wishList/wishList.jsx";
import Chatbot from "./components/Chatbot/Chatbot.jsx";
import { FaComments } from "react-icons/fa";
import "./chatbot-animate.css"; // سنضيف هذا الملف للأنيميشن

const LayoutWithNavFooter = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

const LayoutWithoutNavFooter = ({ children }) => <>{children}</>;

function AppRoutes({
  showChatbot,
  chatbotVisible,
  handleShowChatbot,
  handleCloseChatbot,
}) {
  const location = useLocation();

  return (
    <>
      <Routes>
        {/* Routes without Navbar/Footer */}
        <Route
          path="/checkout"
          element={
            <LayoutWithoutNavFooter>
              <Checkout />
            </LayoutWithoutNavFooter>
          }
        />
        <Route
          path="/login"
          element={
            <LayoutWithoutNavFooter>
              <SignIn />
            </LayoutWithoutNavFooter>
          }
        />
        <Route
          path="/signup"
          element={
            <LayoutWithoutNavFooter>
              <SignUp />
            </LayoutWithoutNavFooter>
          }
        />
        <Route
          path="/changepassword"
          element={
            <LayoutWithNavFooter>
              <ChangePassword />
            </LayoutWithNavFooter>
          }
        />

        {/* Routes with Navbar/Footer */}
        <Route
          path="/"
          element={
            <LayoutWithNavFooter>
              <Home />
            </LayoutWithNavFooter>
          }
        />
        <Route
          path="/shop"
          element={
            <LayoutWithNavFooter>
              <Products />
            </LayoutWithNavFooter>
          }
        />
        <Route
          path="/shop/:id"
          element={
            <LayoutWithNavFooter>
              <ProductDetails />
            </LayoutWithNavFooter>
          }
        />
        <Route
          path="/blog"
          element={
            <LayoutWithNavFooter>
              <Blog />
            </LayoutWithNavFooter>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <LayoutWithNavFooter>
              <PostDetails />
            </LayoutWithNavFooter>
          }
        />
        <Route
          path="/about"
          element={
            <LayoutWithNavFooter>
              <About />
            </LayoutWithNavFooter>
          }
        />
        <Route
          path="/contactus"
          element={
            <LayoutWithNavFooter>
              <ContactUs />
            </LayoutWithNavFooter>
          }
        />
        <Route
          path="/cart"
          element={
            <LayoutWithNavFooter>
              <Cart />
            </LayoutWithNavFooter>
          }
        />
        <Route
          path="/orders"
          element={
            <LayoutWithNavFooter>
              <Orders />
            </LayoutWithNavFooter>
          }
        />
        <Route
          path="/orderitems"
          element={
            <LayoutWithNavFooter>
              <OrderItems />
            </LayoutWithNavFooter>
          }
        />
        <Route
          path="/profile"
          element={
            <LayoutWithNavFooter>
              <ProfileUser />
            </LayoutWithNavFooter>
          }
        />
        <Route
          path="/forgetpassword"
          element={
            <LayoutWithNavFooter>
              <ForgetPass />
            </LayoutWithNavFooter>
          }
        />
        <Route
          path="/wishlist"
          element={
            <LayoutWithNavFooter>
              <WishlistPage />
            </LayoutWithNavFooter>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* زر أيقونة الشات بوت */}
      {!["/login", "/signup", "/checkout"].includes(location.pathname) && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
          <button
            className="bg-[#3A5B22]/80 hover:bg-[#2f4c1b]/80 text-white p-4 rounded-full shadow-lg flex items-center justify-center mb-2"
            style={{ fontSize: 28 }}
            onClick={() =>
              chatbotVisible ? handleCloseChatbot() : handleShowChatbot()
            }
            aria-label="Open Chatbot"
          >
            <FaComments />
          </button>
          {chatbotVisible && (
            <div
              className={showChatbot ? "animate-fade-in" : "animate-fade-out"}
            >
              <Chatbot onClose={handleCloseChatbot} />
            </div>
          )}
        </div>
      )}
    </>
  );
}

function App() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatbotVisible, setChatbotVisible] = useState(false);

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData?.id;
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [dispatch]);

  // عند إظهار الشات بوت
  const handleShowChatbot = () => {
    setChatbotVisible(true);
    setShowChatbot(true);
  };

  // عند إغلاق الشات بوت (زر الإكس)
  const handleCloseChatbot = () => {
    setShowChatbot(false);
    setTimeout(() => setChatbotVisible(false), 250); // نفس مدة fadeOut
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <ToastContainer position="top-right" autoClose={3000} />
      <SearchProvider>
        <BrowserRouter>
          <AppRoutes
            showChatbot={showChatbot}
            chatbotVisible={chatbotVisible}
            handleShowChatbot={handleShowChatbot}
            handleCloseChatbot={handleCloseChatbot}
          />
        </BrowserRouter>
      </SearchProvider>
    </>
  );
}

export default App;

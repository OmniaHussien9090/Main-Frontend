import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Imports for En.json
import navbarEN from "./locales/en/navbar.json";
import aboutEN from "./locales/en/about.json";
import blogEN from "./locales/en/blog.json";
import cartEN from "./locales/en/cart.json"; 
import changepasswordEN from "./locales/en/changepassword.json"; 
import checkoutEN from "./locales/en/checkout.json";
import contactusEN from "./locales/en/contactus.json";
import footerEN from "./locales/en/footer.json";
import homeEN from "./locales/en/home.json";
import orderitemsEN from "./locales/en/orderitems.json";
import ordersEN from "./locales/en/orders.json";
import postdetailsEN from "./locales/en/postdetails.json";
import productdetailsEN from "./locales/en/productdetails.json";
import productsEN from "./locales/en/products.json";
import profileuserEN from "./locales/en/profileuser.json";
import signinEN from "./locales/en/signin.json";
import signupEN from "./locales/en/signup.json";
import chatbotEN from "./locales/en/chatbot.json"; 
 import wishlistEN from "./locales/en/wishlist.json";

// Imports for Ar.json
import navbarAR from "./locales/ar/navbar.json";
import aboutAR from "./locales/ar/about.json";
import blogAR from "./locales/ar/blog.json";
import cartAR from "./locales/ar/cart.json"; 
import changepasswordAR from "./locales/ar/changepassword.json";
import checkoutAR from "./locales/ar/checkout.json";
import contactusAR from "./locales/ar/contactus.json";
import footerAR from "./locales/ar/footer.json";
import homeAR from "./locales/ar/home.json";
import orderitemsAR from "./locales/ar/orderitems.json";
import ordersAR from "./locales/ar/orders.json";
import postdetailsAR from "./locales/ar/postdetails.json";
import productdetailsAR from "./locales/ar/productdetails.json";
import productsAR from "./locales/ar/products.json";
import profileuserAR from "./locales/ar/profileuser.json";
import signinAR from "./locales/ar/signin.json";
import signupAR from "./locales/ar/signup.json";
import chatbotAR from "./locales/ar/chatbot.json"; 
import wishlistAR from "./locales/ar/wishlist.json";

const resources = {
  en: {
    navbar: navbarEN,
    footer: footerEN,
    home: homeEN,
    about: aboutEN,
    contactus: contactusEN,
    cart: cartEN,
    changepassword: changepasswordEN,
    checkout: checkoutEN,
    orders: ordersEN,
    orderitems: orderitemsEN,
    signin: signinEN,
    signup: signupEN,
    profileuser: profileuserEN,
    products: productsEN,
    productdetails: productdetailsEN,
    blog: blogEN,
    postdetails: postdetailsEN,
    chatbot: chatbotEN, 
    wishlist: wishlistEN,
  },
  ar: {
    navbar: navbarAR,
    footer: footerAR,
    home: homeAR,
    about: aboutAR,
    contactus: contactusAR,
    cart: cartAR,
    changepassword: changepasswordAR,
    checkout: checkoutAR,
    orders: ordersAR,
    orderitems: orderitemsAR,
    signin: signinAR,
    signup: signupAR,
    profileuser: profileuserAR,
    products: productsAR,
    productdetails: productdetailsAR,
    blog: blogAR,
    postdetails: postdetailsAR,
    chatbot: chatbotAR,
    wishlist: wishlistAR,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: false,
    ns: [
      "navbar",
      "footer",
      "home",
      "about",
      "contactus",
      "cart",
      "changepassword",
      "checkout",
      "orders",
      "orderitems",
      "signin",
      "signup",
      "profileuser",
      "products",
      "productdetails",
      "blog",
      "postdetails",
      "chatbot",
      "wishlist",
    ],
    defaultNS: "navbar",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

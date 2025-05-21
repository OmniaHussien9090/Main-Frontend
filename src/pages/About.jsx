import Hero from "../components/hero/hero.jsx";
import Layout from "../components/layout/layout.jsx";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import bannerAbout from "../assets/images/Rectangle 48.png";
import Functionality from "../components/functionality/functionality.jsx";
import ProgressBar from "../components/progressbar/progressbar.jsx";
import Card from "../components/card/card.jsx";
import cardOne from "../assets/images/card-one.png";
import cardTwo from "../assets/images/card-two.png";
import cardThree from "../assets/images/card-three.png";
import { useTranslation } from "react-i18next";
import { SearchContext } from "../searchContext/SearchContext.jsx";
import { useContext } from "react";

function About() {
  const { t } = useTranslation("about");
  const { searchQuery } = useContext(SearchContext);

  // بيانات المميزات مع localization
  const features = [
    {
      icon: <AccessTimeIcon />,
      title: t("shopOnlineTitle"),
      description: t("shopOnlineDesc"),
    },
    {
      icon: <ShoppingBagOutlinedIcon />,
      title: t("freeShippingTitle"),
      description: t("freeShippingDesc"),
    },
    {
      icon: <PaymentOutlinedIcon />,
      title: t("returnPolicyTitle"),
      description: t("returnPolicyDesc"),
    },
    {
      icon: <MonetizationOnOutlinedIcon />,
      title: t("paymentTitle"),
      description: t("paymentDesc"),
    },
  ];

  // بيانات البوستات مع localization
  const blogPosts = [
    {
      image: cardOne,
      title: t("card1Title"),
      date: t("card1Date"),
    },
    {
      image: cardTwo,
      title: t("card2Title"),
      date: t("card2Date"),
    },
    {
      image: cardThree,
      title: t("card3Title"),
      date: t("card3Date"),
    },
  ];

  // فلترة حسب البحث
  const filteredFeatures = features.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <Hero />

      {/* FEATURES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-8 px-2 justify-items-center">
        {filteredFeatures.length > 0 ? (
          filteredFeatures.map((item, index) => (
            <div key={index}>
              <div className="flex items-center mb-2">
                {item.icon}
                <p className="ml-2 font-bold text-[#353535]">{item.title}</p>
              </div>
              <p className="text-[#ABABAB] max-w-[200px]">{item.description}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            {t("noFeaturesFound") || "No features found."}
          </p>
        )}
      </div>

      {/* BANNER */}
      <img
        src={bannerAbout}
        alt={t("bannerAlt")}
        className="w-full h-[350px] object-cover my-8"
      />

      {/* FUNCTIONALITY + PROGRESS */}
      <div className="flex flex-col lg:flex-row justify-between gap-8 px-4">
        <Functionality />
        <ProgressBar />
      </div>

      {/* BLOG POSTS */}
      <div className="mt-12 px-4">
        <p className="font-bold text-xl">{t("lastBlogPost")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 px-4 mb-12">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <Card
              key={index}
              imageCard={post.image}
              titleCard={post.title}
              dateCard={post.date}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            {t("noBlogPostsFound") || "No blog posts found."}
          </p>
        )}
      </div>
    </Layout>
  );
}

export default About;

import { useContext } from "react";
import { SearchContext } from "../searchContext/SearchContext.jsx";
import Carousel from "../components/carousel/carousel.jsx";
import Chair from "../assets/images/chair.png";
import Table from "../assets/images/table.png";
import Contemporarylamps from "../assets/images/contemporary_lamps.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import officeOne from "../assets/images/office_one.png";
import officeTwo from "../assets/images/office_two.png";
import coverOne from "../assets/images/c1.png";
import coverTwo from "../assets/images/c2.jpg";
import coverThree from "../assets/images/c3.jpg";
import coverFour from "../assets/images/c4.jpg";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation("home");
  const { searchQuery } = useContext(SearchContext);

  const sections = [
    {
      title: t("stylishChairs"),
      image: Chair,
      description: t("stylishChairsDesc"),
    },
    {
      title: t("table"),
      image: Table,
      description: t("tableDesc"),
    },
    {
      title: t("contemporaryLamps"),
      image: Contemporarylamps,
      description: t("contemporaryLampsDesc"),
    },
  ];

  const bannerSlides = [
    {
      id: 1,
      type: "banner",
      image: coverOne,
      title: t("banner1Title"),
      description: t("banner1Desc"),
      button: t("viewMore"),
    },
    {
      id: 2,
      type: "banner",
      image: coverTwo,
      title: t("banner2Title"),
      description: t("banner2Desc"),
      button: t("viewMore"),
    },
    {
      id: 3,
      image: coverThree,
      title: t("banner3Title"),
      description: t("banner3Desc"),
      button: t("viewMore"),
    },
    {
      id: 4,
      image: coverFour,
      title: t("banner4Title"),
      description: t("banner4Desc"),
      button: t("viewMore"),
    },
  ];

  const serviceItems = [
    {
      icon: <AccessTimeIcon />,
      title: t("shopOnline"),
      description: t("shopOnlineDesc"),
    },
    {
      icon: <ShoppingBagOutlinedIcon />,
      title: t("freeShipping"),
      description: t("freeShippingDesc"),
    },
    {
      icon: <PaymentOutlinedIcon />,
      title: t("returnPolicy"),
      description: t("returnPolicyDesc"),
    },
    {
      icon: <MonetizationOnOutlinedIcon />,
      title: t("payment"),
      description: t("paymentDesc"),
    },
  ];

  // فلترة sections و serviceItems حسب الـ searchQuery
  const filteredSections = sections.filter((section) =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredServices = serviceItems.filter((service) =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Carousel slides={bannerSlides} variant="banner" idPrefix="banner" />

      {/* Sections */}
      {filteredSections.length > 0 ? (
        filteredSections.map((section, index) => (
          <div
            key={index}
            className={`flex flex-col lg:flex-row ${
              index % 2 === 0 ? "lg:flex-row-reverse" : ""
            } items-center gap-6 sm:gap-10 lg:gap-16 my-12 sm:my-16 px-4`}
          >
            <div className="w-full lg:w-1/2">
              <img
                src={section.image}
                alt={section.title}
                className="w-full max-w-[280px] sm:max-w-[350px] mx-auto"
              />
            </div>
            <div className="w-full lg:w-1/2 text-center">
              <h1 className="text-[#373737] text-2xl sm:text-3xl lg:text-4xl font-bold font-['PTSans'] uppercase mb-4">
                {section.title}
              </h1>
              <p className="text-[#ABABAB] text-sm sm:text-base lg:text-lg font-['PTSans'] max-w-md mx-auto mb-6">
                {section.description}
              </p>
              <button className="btn btn-outline btn-sm sm:btn-md">
                {t("viewMore")} ❯
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-8">
          {t("noSectionsFound") || "No sections found."}
        </p>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 my-16 bg-gray-100 text-center py-8 px-4">
        <p className="text-[#373737] text-xl sm:text-2xl lg:text-3xl font-['PTSans'] font-medium">
          {t("expressDelivery")}
        </p>
        <button className="btn btn-outline btn-sm sm:btn-md">
          {t("viewMore")} ❯
        </button>
      </div>

      {/* Services */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 my-12 px-4 text-center sm:text-left justify-items-center">
        {filteredServices.length > 0 ? (
          filteredServices.map((item, index) => (
            <div key={index} className="max-w-[250px]">
              <div className="flex justify-center sm:justify-start items-center mb-2">
                {item.icon}
                <p className="ml-2 font-bold text-[#353535]">{item.title}</p>
              </div>
              <p className="text-[#ABABAB]">{item.description}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            {t("noServicesFound") || "No services found."}
          </p>
        )}
      </div>

      {/* Blog Cards */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 px-4 my-12 mt-20">
        {[officeOne, officeTwo].map((img, i) => (
          <div key={i} className="card bg-base-100 w-full max-w-sm mx-auto">
            <figure>
              <img src={img} alt="Card Image" className="object-cover" />
            </figure>
            <div className="card-body text-center">
              <h2 className="text-sm text-[#777777] font-[PTSans]">
                {t("blog1Date")}
              </h2>
              <p className="text-[#2D2D2D] text-lg sm:text-xl font-[PTSans] font-bold mt-2 mb-4">
                {t("blog1Title")}
              </p>
              <div className="card-actions justify-center">
                <a className="link link-neutral text-[19px] font-[PTSans]">
                  {t("readMore")}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quotes Carousel */}
      <div className="mt-20">
        <Carousel slides={[]} variant="quoutes" idPrefix="quoutes" />
      </div>
    </>
  );
}

export default Home;

import coverAboutUs from "../../assets/images/banner-about-us-page.png";
import { useTranslation } from "react-i18next";

function Hero() {
    const { t } = useTranslation("about");

  return (
    <div
      className="w-full h-[300px] bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${coverAboutUs})` }}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{t("hero.title")}</h1>
    </div>
  );
}

export default Hero;

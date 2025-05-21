import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation("footer");

  return (
    <footer className="footer flex flex-col md:flex-row justify-between bg-neutral text-neutral-content p-10 gap-8">
      <nav>
        <h6 className="footer-title">{t("aboutUsTitle")}</h6>
        <p className="max-w-xs">{t("aboutUsDesc")}</p>
      </nav>

      <nav>
        <h6 className="footer-title">{t("furniITITitle")}</h6>
        <a className="link link-hover">{t("home")}</a>
        <a className="link link-hover">{t("shop")}</a>
        <a className="link link-hover">{t("aboutUs")}</a>
        <a className="link link-hover">{t("blog")}</a>
      </nav>

      <nav>
        <h6 className="footer-title">{t("downloadTitle")}</h6>
        <a className="link link-hover">{t("instagram")}</a>
        <a className="link link-hover">{t("facebook")}</a>
        <a className="link link-hover">{t("twitter")}</a>
      </nav>

      <nav>
        <h6 className="footer-title">{t("callCenterTitle")}</h6>
        <p>{t("callCenterDesc")}</p>
        <a className="link link-hover">{t("email")}</a>
        <a className="link link-hover">{t("phone")}</a>
      </nav>
    </footer>
  );
}

export default Footer;

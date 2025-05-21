import { useTranslation } from "react-i18next";

function Functionality() {
    const { t } = useTranslation("about");

  return (
    <div className="p-6 w-full md:w-1/2">
      <h1 className="text-2xl md:text-4xl text-[#353535] font-bold font-[PTSans]">
        {t("functionality.title")}
      </h1>
      <p className="text-base md:text-xl text-[#898989] font-[PTSans] mt-6">
        {t("functionality.description")}
      </p>
    </div>
  );
}

export default Functionality;

import { useTranslation } from "react-i18next";

function ProgressBar() {
  const { t } = useTranslation("about");

  return (
    <div className="p-6 w-full md:w-1/2">
      <div className="flex justify-between">
        <h4 className="text-lg md:text-xl font-bold text-[#353535] font-[PTSans]">
          {t("progress.creativity")}
        </h4>
        <h6 className="text-md text-[#353535] font-[PTSans]">
          {t("progress.creativityValue")}
        </h6>
      </div>
      <progress
        className="progress progress-neutral w-full my-4"
        value="72"
        max="100"
      ></progress>

      <div className="flex justify-between">
        <h4 className="text-lg md:text-xl font-bold text-[#353535] font-[PTSans]">
          {t("progress.advertising")}
        </h4>
        <h6 className="text-md text-[#353535] font-[PTSans]">
          {t("progress.advertisingValue")}
        </h6>
      </div>
      <progress
        className="progress progress-neutral w-full my-4"
        value="84"
        max="100"
      ></progress>

      <div className="flex justify-between">
        <h4 className="text-lg md:text-xl font-bold text-[#353535] font-[PTSans]">
          {t("progress.design")}
        </h4>
        <h6 className="text-md text-[#353535] font-[PTSans]">
          {t("progress.designValue")}
        </h6>
      </div>
      <progress
        className="progress progress-neutral w-full my-4"
        value="72"
        max="100"
      ></progress>
    </div>
  );
}

export default ProgressBar;

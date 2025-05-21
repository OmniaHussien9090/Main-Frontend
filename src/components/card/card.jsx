import { useTranslation } from "react-i18next";

function Card({ imageCard, titleCard, dateCard }) {
  const { t } = useTranslation("about");
  
  return (
    <div className="card bg-base-100 w-full sm:w-[300px] shadow-sm mx-auto">
      <figure>
        <img src={imageCard} alt="Card Image" className="w-full object-cover" />
      </figure>
      <div className="card-body text-center">
        <h2 className="text-sm text-[#9E9E9E] font-[PTSans]">{dateCard}</h2>
        <p className="text-[#303030] text-base font-[PTSans]">{titleCard}</p>
        <div className="card-actions justify-center">
          <a className="link link-neutral text-[19px] font-[PTSans]">
            {t("card.readMore")}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Card;

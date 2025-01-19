import { useNavigate } from "react-router-dom";
import taxiIcon from "../../assets/taxi-icon.png";
import OptionalButton from "../../components/optional-button/OptionalButton";
import { useTranslation } from "react-i18next";
interface BoostItemProps {
  header: string;
  description: string;
  price: string;
  link: string;
  active?: boolean;
  image?: string;
}
function BoostItem({
  header,
  description,
  price,
  link,
  active,
  image,
}: BoostItemProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="border-b-thin flex h-[120px] w-full flex-row items-center pb-3">
      {image ? (
        <img src={image} className="mr-2 h-[120px] w-[120px] rounded-xl" />
      ) : (
        ""
      )}
      <div className="flex h-[120px] w-full flex-col justify-between pl-1 pr-1 text-left text-xs leading-[133%]">
        <h3 className="font-bold text-white">{header}</h3>
        <p>{description}</p>
        <div className="flex flex-row items-end justify-between">
          <div className="text-white">
            <img
              src={taxiIcon}
              className="mb-1 mr-1 inline h-[15px] w-[15px] rounded-[3px]"
            />
            {price}
          </div>
          <OptionalButton
            text={t("pages.boosts.goto")}
            onClick={() => navigate(link)}
            active={active}
            className="h-[24px] pb-[4px] pl-[12px] pr-[12px] pt-[4px] text-xs font-normal"
          />
        </div>
      </div>
    </div>
  );
}

export default BoostItem;

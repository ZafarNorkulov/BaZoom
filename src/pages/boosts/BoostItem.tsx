import { useNavigate } from "react-router-dom";
import taxiIcon from "../../assets/taxi-icon.png";
import OptionalButton from "../../components/optional-button/OptionalButton";
import { useTranslation } from "react-i18next";
import Divider from "../../components/divider";
import { ReactNode } from "react";
interface BoostItemProps {
  header: string;
  description: string;
  price: string;
  link: string;
  active?: boolean;
  image?: string;
  button?: string,
  sub?: ReactNode
}
function BoostItem({
  header,
  description,
  price,
  link,
  active,
  image,
  button,
  sub
}: BoostItemProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="h-[110px] w-full">

      <div className="flex  items-center">
        {image ? (
          <img src={image} className="mr-2 h-[90px] w-[90px] rounded-xl" />
        ) : (
          ""
        )}
        <div className="flex h-[90px] w-full flex-col justify-between pl-1 pr-1 text-left text-xs leading-[133%]">
          <div className="flex flex-col gap-[6px]">

            <div className="flex justify-between items-end">
              <h3 className="text-xs leading-[14.5px] font-bold text-white">{header}</h3>
              {sub}
            </div>
            <p className="text-[10px] leading-3">{description}</p>
          </div>
          <div className="flex flex-row items-end justify-between">
            <div className="text-white">
              <img
                src={taxiIcon}
                className="mb-1 mr-1 inline h-[15px] w-[15px] rounded-[3px]"
              />
              {price}
            </div>
            <OptionalButton
              text={button || t("pages.boosts.goto")}
              onClick={() => navigate(link)}
              active={active}
              className="h-[24px] pb-[4px] pl-[12px] pr-[12px] pt-[4px] text-xs font-normal"
            />
          </div>
        </div>
      </div>
      <Divider className="mt-5" />
    </div>
  );
}

export default BoostItem;

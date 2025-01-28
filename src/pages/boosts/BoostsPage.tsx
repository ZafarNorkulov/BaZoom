import { useTranslation } from "react-i18next";
import BoostItem from "./BoostItem";
import videoImage from "./assets/sticker.gif";
import voucherImage from "./assets/voucher.png";
import taxitaxi from "../../assets/taxitaxi.jpeg";
import { useState } from "react";
import taxiIcon from "../../assets/taxi-icon.png"

function BoostsBage() {
  const { t } = useTranslation();
  const [isDaily, setIsDaily] = useState<boolean>(true)
  return (
    <div className="mt-[30px]">
      <div className="max-container">
        <div className="w-full bg-deepgray rounded-2xl p-1 relative flex">
          <button
            className={`w-1/2 h-[31px] p-2 leading-[14.5px] text-xs font-bold transition-colors z-20 duration-300 ${isDaily ? 'text-white' : 'text-gray'}`}
            onClick={() => setIsDaily(true)}
          >
            {t("pages.boosts.tabs.daily")}
          </button>
          <button
            className={`w-1/2 h-[31px] p-2 leading-[14.5px] text-xs font-bold transition-colors z-20 duration-300 ${!isDaily ? 'text-white' : 'text-gray'}`}
            onClick={() => setIsDaily(false)}
          >
            {t("pages.boosts.tabs.reusable")}
          </button>
          <div
            className={`absolute top-1 bottom-1 rounded-2xl z-10 taxi-gradient w-1/2 transition-all duration-300 ease-in ${isDaily ? 'left-1' : 'left-1/2'}`}
          ></div>
        </div>
        <div className="flex h-max w-full flex-col gap-4 mt-5">
          {
            isDaily ? (
              <>
                <BoostItem
                  header={t("pages.boosts.mining.header")}
                  description={t("pages.boosts.mining.description")}
                  price={t("pages.boosts.mining.price")}
                  link="/mining-ways"
                  image={taxiIcon}
                  active
                />
                <BoostItem
                  header={t("pages.boosts.video.header")}
                  description={t("pages.boosts.video.description")}
                  price={t("pages.boosts.video.price")}
                  link="/boosts/videos"
                  image={videoImage}
                  active
                />
              
              </>
            ) : (
              <>
               
                <BoostItem
                  header={t("pages.boosts.holding.buy.header")}
                  description={t("pages.boosts.holding.buy.description")}
                  price={t("pages.boosts.holding.buy.price")}
                  image={taxitaxi}
                  link="/mining-ways"
                />
                <BoostItem
                  header={t("pages.boosts.holding.sell.header")}
                  description={t("pages.boosts.holding.sell.description")}
                  price={t("pages.boosts.holding.sell.price")}
                  image={taxitaxi}
                  link="/boosts/buy"
                />
                  <BoostItem
                  header={t("pages.boosts.voucher.header")}
                  description={t("pages.boosts.voucher.description")}
                  price={t("pages.boosts.voucher.price")}
                  image={voucherImage}
                  link="/boosts/buy"
                />
              </>
            )
          }
        </div>
      </div>
    </div>

  );
}

export default BoostsBage;

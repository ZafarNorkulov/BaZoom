import { useTranslation } from "react-i18next";
import BoostItem from "./BoostItem";
import videoImage from "./assets/sticker.gif";
import voucherImage from "./assets/voucher.png";
import taxitaxi from "../../assets/taxitaxi.jpeg";
import taxiIcon from "../../assets/taxi-icon.png"
import onChain from "./assets/onChain.png"
import support from "./assets/support-project.png"
import BackPage from "../../components/backPage";
import option from "./assets/option.svg"
import { useSearchParams } from "react-router-dom";

function BoostsBage() {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const isDaily = searchParams.get("isDaily") === "true";
  return (
    <div >
      <BackPage title="Задания" />
      <div className="max-container">
        <div className="w-full bg-deepgray rounded-2xl p-1 relative flex mt-[30px]">
          <button
            className={`w-1/2 h-[31px] p-2 leading-[14.5px] text-xs font-bold transition-colors z-20 duration-300 ${!isDaily ? 'text-white' : 'text-gray'}`}
            onClick={() => setSearchParams({ isDaily: "false" })}
          >
            {t("pages.boosts.tabs.daily")}
          </button>
          <button
            className={`w-1/2 h-[31px] p-2 leading-[14.5px] text-xs font-bold transition-colors z-20 duration-300 ${isDaily ? 'text-white' : 'text-gray'}`}
            onClick={() => setSearchParams({ isDaily: "true" })}
          >
            {t("pages.boosts.tabs.reusable")}
          </button>
          <div
            className={`absolute top-1 bottom-1 rounded-2xl z-10 taxi-gradient w-1/2 transition-all duration-300 ease-in `}
            style={{ left: !isDaily ? "4px" : "50%" }}
          ></div>
        </div>
        <div className="flex h-max w-full flex-col gap-4 mt-5">
          {
            !isDaily ? (
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
                  link="/videos"
                  image={videoImage}
                  active
                />
                <BoostItem
                  header={t("pages.boosts.onchain.header")}
                  description={t("pages.boosts.onchain.description")}
                  price={t("pages.boosts.onchain.price")}
                  link="/videos"
                  image={onChain}
                  button={t("pages.boosts.perform")}
                  active
                />
                <BoostItem
                  header={t("pages.boosts.support.header")}
                  description={t("pages.boosts.support.description")}
                  price={t("pages.boosts.support.price")}
                  link="/videos"
                  image={support}
                  button={t("pages.boosts.perform")}
                  active
                />

              </>
            ) : (
              <>

                <BoostItem
                  header={t("pages.boosts.holding.buy.header")}
                  sub={<div className="flex items-center gap-1">
                    <p className="text-[10px] leading-4 ">{t("pages.boosts.holding.buy.sub")}: 1.1M</p>
                    <img className="w-3 h-3 rounded-sm" src={taxitaxi} alt="" />
                  </div>}
                  description={t("pages.boosts.holding.buy.description")}
                  price={t("pages.boosts.holding.buy.price")}
                  image={taxitaxi}
                  link="/boosts/buy"
                />
                <BoostItem
                  header={t("pages.boosts.holding.sell.header")}
                  sub={<div className="flex items-center gap-1">
                    <p className="text-[10px] leading-4 ">{t("pages.boosts.holding.sell.sub")}: 100.1K</p>
                    <img className="w-3 h-3 rounded-sm" src={taxitaxi} alt="" />
                    <img className="w-3 h-3 rounded-sm" src={option} alt="" />
                  </div>}
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

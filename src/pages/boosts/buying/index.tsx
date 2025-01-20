import { useTranslation } from "react-i18next";
import BackPage from "../../../components/backPage";
import emoji from "../assets/bomb-emoji-svgrepo-com.png";
import questionIcon from "../assets/question.png";
import questionGradient from "../assets/question-gradient.png";
import QuestionModal from "../../../components/modals/questionModal";
import { useState } from "react";
const BuyingBoost = () => {
  const { t } = useTranslation();
  const [modalId, setModalId] = useState<number | null>(null);

  return (
    <section>
      <BackPage title={t("pages.buyingBoost.title")} />
      <div className="max-container">
        <div className="mt-[80px]">
          <img src={emoji} className="mx-auto h-[60px] w-[60px]" />
          <p className="text-center text-lg leading-6 tracking-[0.005em]">
            {t("pages.buyingBoost.text")}
          </p>
        </div>
        <div className="mt-5 flex gap-3">
          <button className="taxi-gradient relative flex w-1/2 items-center justify-center rounded-xl py-[12.5px] text-xs font-semibold leading-[14px] text-white">
            <div
              className="absolute right-1 top-1 cursor-pointer"
              onClick={() => setModalId(1)}
            >
              <img src={questionIcon} alt="" />
            </div>
            {t("pages.buyingBoost.exchange")}
          </button>
          <div className="border-gradient relative flex w-1/2 items-center justify-center rounded-xl border py-[12.5px]">
            <div
              className="absolute right-1 top-1 cursor-pointer"
              onClick={() => setModalId(2)}
            >
              <img src={questionGradient} alt="" />
            </div>
            <button className="text-gradient text-xs font-semibold leading-[14px]">
              {t("pages.buyingBoost.market")}
            </button>
          </div>
        </div>
      </div>
      <QuestionModal
        open={modalId == 1}
        title={t("pages.buyingBoost.exchange")}
        text={t("pages.buyingBoost.exchangeText")}
        url="/boosts/buy/exchange"
      />
      <QuestionModal
        open={modalId == 2}
        title={t("pages.buyingBoost.market")}
        text={t("pages.buyingBoost.exchangeText")}
        url="/boosts/buy/market"
      />
    </section>
  );
};

export default BuyingBoost;

import { Link } from "react-router-dom";
import shockAbsorber from "./assets/shock-absorber.svg";
import backToHome from "./assets/back-to-home.svg";
import backToHomeEn from "./assets/back_to_main_en.svg";
import "./work-in-progress-page.css";
import { useTranslation } from "react-i18next";
import { useInitData } from "@vkruglikov/react-telegram-web-app";

function WorkInProgressPage() {
  const { t } = useTranslation();
  const [initDataUnsafe] = useInitData();
  const lang = initDataUnsafe?.user?.language_code || "en";
  return (
    <div className="container w-full max-w-full">
      <div className="work-in-progress-container m-auto flex flex-col items-center justify-around space-y-5">
        <img src={shockAbsorber} className="shock-absorber-size" />
        <div className="w-3/4 text-center text-xl">
          <p>{t("pages.workInProgress.part1")}</p>
          <p>{t("pages.workInProgress.part2")}</p>
        </div>
        <Link to={"/"}>
          <img
            src={lang == "ru" ? backToHome : backToHomeEn}
            className="back-to-home-button"
          />
        </Link>
      </div>
    </div>
  );
}

export default WorkInProgressPage;

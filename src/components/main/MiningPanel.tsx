import miningIcon from "./assets/miner-gif.gif";
import restartIcon from "./assets/restart.svg";
import { useTranslation } from "react-i18next";

function MiningPanel() {
  const { t } = useTranslation();
  return (
    <div className="w-screenl flex flex-col items-center p-4 pb-1 pt-5">
      <div className="relative h-[76vw] max-h-[38vh] w-[76vw] max-w-[38vh]">
        <img src={miningIcon} className="w-full" />
      </div>
      <div className="mt-2 flex flex-row items-center justify-center">
        <img src={restartIcon} className="restart-icon mr-2 h-4 w-4" />
        <p className="text-center">{t("pages.main.diceMining")}</p>
      </div>
    </div>
  );
}
export default MiningPanel;

import { useInitData } from "@vkruglikov/react-telegram-web-app";
import taxiIcon from "../../assets/taxi-icon.png";
import { getGameStatus } from "../../services/GameService";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { formatNumber } from "../../services/UIService";

function GameStatus() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [error, setError] = useState(false);
  const [, initData] = useInitData();
  const { t } = useTranslation();

  useEffect(() => {
    if (!initData) return;
    
    getGameStatus(initData)
      .then((s) => {
        if (s && typeof s.total_users === 'number' && typeof s.total_balance === 'number') {
          setTotalUsers(s.total_users);
          setTotalBalance(s.total_balance);
        } else {
          setError(true);
        }
      })
      .catch(() => {
        setError(true);
      });
  }, [initData]);

  if (error) {
    return (
      <div className="flex h-11 min-w-max flex-col items-end justify-around">
        <p>{t("components.gameStatus.players")}: 0</p>
        <div className="flex flex-row">
          <img src={taxiIcon} className="small-icon-size mr-1.5 rounded-[3px]" />
          <p>0 DICE</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-11 min-w-max flex-col items-end justify-around">
      <p>
        {t("components.gameStatus.players")}: {(totalUsers || 0).toLocaleString("de")}
      </p>
      <div className="flex flex-row">
        <img src={taxiIcon} className="small-icon-size mr-1.5 rounded-[3px]" />
        <p>{formatNumber(totalBalance || 0)} DICE</p>
      </div>
    </div>
  );
}

export default GameStatus;

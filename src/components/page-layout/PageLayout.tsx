import { Outlet, useLocation } from "react-router-dom";
import Header from "../header/Header";
import NavMenu from "../nav-menu/NavMenu";
import { useExpand, useInitData } from "@vkruglikov/react-telegram-web-app";
import { useEffect, useState } from "react";
import LoadingScreen from "../loading-screen/LoadingScreen";
import { getProfile, updateProfile } from "../../services/UserService";
import taxiIcon from "../../assets/taxi-icon.png";
import { useTranslation } from "react-i18next";
import { api } from "../../services/url";

function TelegramRedirect() {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center p-4 text-center">
      <img src={taxiIcon} className="mb-8 h-24 w-24 rounded-2xl" />
      <h1 className="mb-4 text-2xl font-bold text-white">
        {t("pages.telegramRedirect.title", "Better Experience in Telegram")}
      </h1>
      <p className="mb-8 text-gray">
        {t(
          "pages.telegramRedirect.description",
          "This game works best in Telegram. Click below to open in Telegram.",
        )}
      </p>
      <a
        href="https://t.me/Holders_Taxi_Bot/game"
        className="taxi-gradient flex h-12 w-full max-w-xs items-center justify-center rounded-xl text-white"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t("pages.telegramRedirect.button", "Open in Telegram")}
      </a>
    </div>
  );
}

function PageLayout() {
  const [isExpanded, expand] = useExpand();
  if (!isExpanded) expand();

  const [initDataUnsafe, initData] = useInitData();
  const [isLoading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Если нет данных Telegram, показываем страницу перенаправления
  if (!initData && !initDataUnsafe?.user) {
    return <TelegramRedirect />;
  }

  useEffect(() => {
    if (!initData) return;

    // Начинаем с 0%
    setLoadingProgress(0);

    // Анимируем до 80% за 5 секунд
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => Math.min(prev + 2, 80));
    }, 125);
    const userId = initDataUnsafe!.user!.id;
    getProfile({initData, userId}).then(() => {
      updateProfile(initData);

      // Очищаем интервал
      clearInterval(progressInterval);

      // Анимируем до 100% за 1 секунду
      setLoadingProgress(100);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  }, [initData]);

  const location = useLocation();
  const hasboost = location.pathname.includes("/boosts");
  console.log(api)

  return isLoading ? (<LoadingScreen progress={loadingProgress} />) : (
    <div className="w-screen overflow-y-scroll scroll-smooth pb-[24vw] font-sans text-gray">
      {!hasboost ? <Header /> : null}
      <Outlet />
      <NavMenu />
    </div>
  );
}

export default PageLayout;

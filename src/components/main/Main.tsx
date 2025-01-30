import {
  useInitData,
  WebAppProvider,
} from "@vkruglikov/react-telegram-web-app";
import { useEffect } from "react";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import { I18nextProvider } from "react-i18next";
import { useTranslation } from "react-i18next";
import StoreProvider from "../store-provider/StoreProvider";
import Router from "../../router";


i18next
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

const Main = () => {
  const [initDataUnsafe] = useInitData();
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = initDataUnsafe?.user?.language_code;
    if (lang) i18n.changeLanguage(lang);
    else i18n.changeLanguage("en");
  }, [initDataUnsafe]);
  useEffect(() => {
    const tg = (window as any).Telegram.WebApp;
    tg.ready();
  }, []);

  return (
    <I18nextProvider i18n={i18next}>
      <WebAppProvider>
      <StoreProvider>
        <Router/>
        </StoreProvider>
      </WebAppProvider>
    </I18nextProvider>
  );
};

export default Main;
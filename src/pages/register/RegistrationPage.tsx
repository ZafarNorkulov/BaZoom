import { useTranslation } from "react-i18next";
import { registerUser } from "../../services/UserService.ts";
import { useInitData } from "@vkruglikov/react-telegram-web-app";
import { useNavigate } from "react-router-dom";
import cameraIcon from "./assets/camera.svg";
import stopIcon from "./assets/stopsign.svg";
import { useCallback } from "react";
import { useStore } from "../../components/store-provider/StoreProvider.tsx";

interface RegistrationMethodProps {
  onClick: () => void;
  name: string;
  active?: boolean;
  icon: string;
}

const RegistrationMethod = ({
  onClick,
  name,
  active,
  icon,
}: RegistrationMethodProps) => {
  const { t } = useTranslation();

  return (
    <div
      className={
        (active ? "taxi-gradient shadow-taxi-card" : "bg-darkgray") +
        " " +
        "flex min-h-full w-full items-center justify-center rounded-xl p-px"
      }
      onClick={onClick}
    >
      <div className="flex h-full w-full flex-col items-center rounded-xl bg-deepgray p-3 pt-8 text-center">
        <img src={icon} className="mb-4 h-[50px] w-[50px]" alt={name} />
        <p className="text-[12px] text-gray">
          {t(`pages.registration.${name}.caption`)}
        </p>
        <p className="mb-3 font-[900] text-white">
          {t(`pages.registration.${name}.name`)}
        </p>
        <p className="text-left text-[12px] font-medium text-gray">
          {t(`pages.registration.${name}.text`)}
        </p>
      </div>
    </div>
  );
};

const RegistrationPage = () => {
  const { t } = useTranslation();
  const [, initData] = useInitData();
  const navigate = useNavigate();
  const { userStore } = useStore();

  const continueWithoutPhoto = useCallback(() => {
    userStore.setHasVerificationPhoto(false);
    registerUser(initData!, undefined).then(() => navigate("/main"));
  }, [initData, navigate, userStore]);

  const continueWithPhoto = useCallback(() => {
    userStore.setHasVerificationPhoto(true);
    navigate("/register/face");
  }, [userStore, navigate]);

  return (
    <div className="flex w-full flex-col items-center space-y-6 p-4">
      <div className="w-[75%] text-center">
        <p className="text-[26px] font-extrabold text-white">
          {t("pages.registration.registration")}
        </p>
        <p className="text-[16px] font-medium text-gray">
          {t("pages.registration.subheader")}
        </p>
      </div>
      <div className="flex h-max w-full space-x-4">
        <RegistrationMethod
          onClick={continueWithPhoto}
          name="method1"
          icon={cameraIcon}
          active
        />
        <RegistrationMethod
          onClick={continueWithoutPhoto}
          name="method2"
          icon={stopIcon}
        />
      </div>
    </div>
  );
};

export default RegistrationPage;

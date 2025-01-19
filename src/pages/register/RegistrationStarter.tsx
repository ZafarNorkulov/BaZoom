import { useTranslation } from "react-i18next";

interface RegistrationStarterProps {
  onContinue: () => void;
}
function RegistrationStarter({ onContinue }: RegistrationStarterProps) {
  const { t } = useTranslation();
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center text-center text-white">
      <div className="ml-4 mr-4 rounded-xl bg-deepgray p-2">
        <h1 className="mb-3 text-2xl font-bold">
          {t("pages.registration.registration")}
        </h1>
        <p>{t("pages.registration.instructions")}</p>
        <button
          className="taxi-gradient mt-4 h-10 w-[90%] rounded-xl"
          onClick={onContinue}
        >
          {t("pages.registration.continue")}
        </button>
      </div>
    </div>
  );
}

export default RegistrationStarter;

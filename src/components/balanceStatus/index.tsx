import { useTranslation } from "react-i18next";
import taxiIcon from "../../assets/taxi-icon.png";
import { formatNumber } from "../../services/UIService";
import { observer } from "mobx-react-lite";
import UserInfoStore from "../../stores/UserInfoStore";

interface BalanceStatusProps {
    store: UserInfoStore;
}

const BalanceStatus = observer(({ store }: BalanceStatusProps) => {
    const { t } = useTranslation();
    return (
        <div
            className={
                "flex h-[120px] w-full flex-col items-center justify-end short:justify-start"
            }
        >
            <div className="balance-block mt-2 flex w-full flex-row items-center justify-between space-x-3 rounded-2xl bg-dimgray p-2">
                <div className="flex flex-row items-center space-x-2">
                    <img
                        src={taxiIcon}
                        className="h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-black"
                    />
                    <div className="flex h-10 flex-shrink-0 flex-col items-start justify-evenly font-medium leading-4">
                        <p className="text-[12px]">{t("pages.main.available")}:</p>
                        <p className="font-bold text-white">
                            {formatNumber(store.profile.balance, true)} DICE
                        </p>
                    </div>
                </div>
                <button className="taxi-gradient h-10 w-[110px] flex-shrink justify-self-end rounded-full border-none text-center leading-4 text-white mobile-s:h-[50px] mobile-s:w-[58px] mobile-s:rounded-2xl">
                    Claim DICE
                </button>
            </div>
        </div>
    );
});

export default BalanceStatus;

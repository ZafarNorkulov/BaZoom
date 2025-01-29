import Divider from "../../components/divider"
import greenIcon from "./assets/green-icon.svg"
import redIcon from "./assets/red-icon.svg"
import diceIcon from "./assets/dice.png"
import taxiIcon from "./assets/taxi.png"
import tonIcon from "./assets/ton.png"
import { HistoryProps } from "./history.type"
import { useTranslation } from "react-i18next"



const HistoryItem = ({ bid, status, dropped, price, time }: HistoryProps) => {
    const { t } = useTranslation()
    return (
        <div className="flex items-start gap-[10px] ">
            <div>
                <img src={status === "win" ? greenIcon : redIcon} className="w-10 h-10" />
            </div>
            <div className="flex flex-col">

                <div className="flex justify-between w-[300px]">
                    <div className="flex flex-col justify-between items-start gap-[2px]">
                        <h5 className="text-sm leading-5 font-semibold text-white">{t("pages.history.title")} {bid}</h5>
                        <p className={`text-xs leading-4 font-medium ${status == "win" ? "text-green" : "text-red"}`}>{status === "win" ? t("pages.history.descWin") : t("pages.history.descLose")} {dropped}</p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                        <div className="flex items-center gap-1">
                            {price.map(item => (
                                <div className="flex items-center gap-1">

                                    <span className={`text-sm leading-5 font-semibold ${item.priceStatus == "win" ? "text-green" : "text-red"}`}>
                                        {item.priceStatus === "win" ? "+" : "-"}{item.value}
                                    </span>
                                    <img src={item.type == "dice" ? diceIcon : item.type == "taxi" ? taxiIcon : tonIcon} className="w-[15px] h-[15px]" />
                                </div>
                            ))}
                        </div>

                        <p className="text-[10px] leading-5 text-[#8F9098]">{time}</p>
                    </div>
                </div>
                <Divider className="w-full mt-4" />
            </div>
        </div >
    )
}

export default HistoryItem
import Divider from "../divider"
// import noOrder from "../../assets/no-order.png"
import ton from "../../assets/toncoin.png"
import taxi from "../../assets/taxitaxi.jpeg"
import virus from "../../assets/virus.png"
import rightArrow from "../../assets/right-order-arrow.png"
import clock from "../../assets/clock-circle.png"
import { useTranslation } from "react-i18next"

// const NotOrders = () => {
//     return (
//         <div className="flex items-center justify-center flex-col gap-5 mt-[130px]">
//             <img src={noOrder} className="w-12 h-12" alt="" />
//             <h4>У Вас нет открытых ордеров</h4>
//         </div>
//     )
// }

const Orders = () => {

    const { t } = useTranslation()

    return (
        <div>
            <div className="max-container">
                <label htmlFor="checkbox" className="flex items-center text-sm mt-5 leading-5 font-medium gap-[10px]">

                    <input type="checkbox" defaultChecked id="checkbox" className="accent-purple w-6 h-6" />
                   {t("pages.exchange.orders.checkbox")}
                </label>
            </div>
            <Divider className="mt-5" />
            <div className="max-container !mt-[25px] flex flex-col gap-[7px]">
                <div className="card py-[17px] pl-5 pr-3 bg-deepgray rounded-[14px]">
                    <div className="flex justify-between items-center">

                        <h5 className="text-xs leading-5 font-medium text-green">{t("pages.exchange.orders.cards.title")}</h5>
                        <button className="text-[10px] text-[#8F9098] px-2 rounded-[8px] border border-[#8F9098] ">{t("pages.exchange.orders.cards.button")}</button>
                    </div>
                    {/* Crypto */}
                    <div className="flex items-center gap-[15px] mt-[15px]">
                        <div className="flex items-center gap-1">

                            <img src={ton} className="w-5 h-5" alt="" />
                            <span className="text-white leading-5 font-medium">TON</span>
                        </div>

                        <img src={rightArrow} className="w-[18px] h-[15px]" />

                        <div className="flex items-center gap-1">
                            <img src={taxi} className="w-5 h-5 rounded-full" alt="" />
                            <span className="text-white leading-5 font-medium">TAXI</span>
                        </div>
                    </div>

                    {/* TIME */}
                    <div className="flex items-center gap-1 mt-[10px]">
                        <img src={clock} className="w-[13px] h-[13px]" />
                        <p className="text-[10px] leading-5 text-[#8F9098]">08.16, 22:50:03</p>
                    </div>
                    {/* KURS */}

                    <div className="mt-[15px]">
                        <p className="text-[10px] leading-3 font-medium text-[#8F9098]">{t("pages.exchange.orders.cards.rate")}: 11 <br />
                        {t("pages.exchange.orders.cards.quantity")}: 0/0.224452214</p>

                    </div>
                    {/* SLIDER */}
                    <div className="mt-[25px]">

                        <div className="w-full h-1 rounded-[9px] bg-[#8F9098]  overflow-hidden">
                            <span className={"block w-[27%] h-full taxi-gradient rounded-[9px]"}></span>
                        </div>
                        <div className="w-full flex items-center justify-between mt-[5px]">
                            <span className="text-xs leading-[14.5px]  ">{t("pages.exchange.orders.cards.completed")}</span>
                            <span className="text-xs leading-[14.5px] font-medium text-white">27%</span>
                        </div>
                    </div>

                </div>

                <div className="card py-[17px] pl-5 pr-3 bg-deepgray rounded-[14px]">
                    <div className="flex justify-between items-center">

                        <h5 className="text-xs leading-5 font-medium text-red">{t("pages.exchange.orders.cards.title")}</h5>
                        <button className="text-[10px] text-[#8F9098] px-2 rounded-[8px] border border-[#8F9098] ">{t("pages.exchange.orders.cards.button")}</button>
                    </div>
                    {/* Crypto */}
                    <div className="flex items-center gap-[15px] mt-[15px]">
                        <div className="flex items-center gap-1">

                            <img src={virus} className="w-5 h-5" alt="" />
                            <span className="text-white leading-5 font-medium">VIRUS</span>
                        </div>

                        <img src={rightArrow} className="w-[18px] h-[15px]" />

                        <div className="flex items-center gap-1">
                            <img src={ton} className="w-5 h-5 rounded-full" alt="" />
                            <span className="text-white leading-5 font-medium">TON</span>
                        </div>
                    </div>

                    {/* TIME */}
                    <div className="flex items-center gap-1 mt-[10px]">
                        <img src={clock} className="w-[13px] h-[13px]" />
                        <p className="text-[10px] leading-5 text-[#8F9098]">08.16, 22:50:03</p>
                    </div>
                    {/* KURS */}

                    <div className="mt-[15px]">
                        <p className="text-[10px] leading-3 font-medium text-[#8F9098]">{t("pages.exchange.orders.cards.rate")}: 11 <br />
                        {t("pages.exchange.orders.cards.quantity")}: 0/0.224452214</p>

                    </div>
                    {/* SLIDER */}
                    <div className="mt-[25px]">

                        <div className="w-full h-1 rounded-[9px] bg-[#8F9098]  overflow-hidden">
                            <span className={"block w-[53%] h-full taxi-gradient rounded-[9px]"}></span>
                        </div>
                        <div className="w-full flex items-center justify-between mt-[5px]">
                            <span className="text-xs leading-[14.5px]  ">{t("pages.exchange.orders.cards.completed")}</span>
                            <span className="text-xs leading-[14.5px] font-medium text-white">53%</span>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Orders
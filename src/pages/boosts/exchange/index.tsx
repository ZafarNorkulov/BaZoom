import BackPage from "../../../components/backPage"
import search from "../../../assets/Search.png"
import { useState } from "react";
import Divider from "../../../components/divider";
import dribble from "../../../assets/Dribbble-Light.svg"
import StarIcon from "../../../components/icons/star";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BuyBoostExchange = () => {
    const { t } = useTranslation()
    const [tabs, setTabs] = useState([
        {   
            id: 1,
            title: t("pages.exchange.all"),
            active: true
        },
        {
            id: 2,
            title: "TON",
            active: false
        },
        {
            id: 3,
            title: "USDT",
            active: false
        },
    ]);
    const handleTabClick = (id: number) => {
        // Yangilangan massivni yaratamiz
        const updatedTabs = tabs.map((tab) =>
            tab.id === id ? { ...tab, active: true } : { ...tab, active: false }
        );
        setTabs(updatedTabs); // Yangilangan massivni set qilamiz
    };
    return (
        <section>
            <BackPage title={t("pages.exchange.head")} />
            <div className="max-container">
                {/* SearchBar */}
                <div className="input px-3 flex items-center gap-[15px] mt-5 bg-[#060606] h-[44px] rounded-full">
                    <img src={search} />

                    <input type="text" placeholder={t("pages.exchange.search")} className="text-sm leading-5 text-gray bg-[#060606] w-full focus-visible:outline-none  " />
                </div>

                {/* TABS */}
                <div className="flex gap-5 mt-3">
                    {
                        tabs.map((tab, index) => (

                            <button key={index} className={`relative text-xs pb-2  leading-5 ${tab.active ? "text-white" : "text-gray"}`}
                                onClick={() => handleTabClick(tab.id)}
                            >{tab.title}
                                <div className={`absolute h-[2px] left-0 rounded-t-sm right-0 bottom-0 transition-all duration-200 ease-linear ${tab.active ? "bg-purple" : "bg-transparent"}`} />
                            </button>
                        ))
                    }
                </div>


            </div>
            <Divider />
            <div className="max-container flex justify-between items-center !mt-3">
                <div className="flex items-center gap-[10px]">
                    <div className="flex items-center gap-[3px]">
                        <h4 className="text-sm leading-4 font-medium">{t("pages.exchange.name")}</h4>
                        <img src={dribble} className="w-[10px] h-[10px]" />
                    </div>
                    <div className="flex items-center gap-[3px]">
                        <h4 className="text-sm leading-4 font-medium">{t("pages.exchange.volume")}</h4>
                        <img src={dribble} className="w-[10px] h-[10px]" />
                    </div>
                </div>
                <div className="flex items-center gap-[10px]">
                    <div className="flex items-center gap-[3px]">
                        <h4 className="text-sm leading-4 font-medium">{t("pages.exchange.price")}</h4>
                        <img src={dribble} className="w-[10px] h-[10px]" />
                    </div>
                    <div className="flex items-center gap-[3px]">
                        <h4 className="text-sm leading-4 font-medium">{t("pages.exchange.change")}</h4>
                        <img src={dribble} className="w-[10px] h-[10px]" />
                    </div>
                </div>
            </div>
            <Divider className="mt-4" />
            <div className="max-container !mt-5">
                <div className="w-full bg-deepgray rounded-xl text-center py-3"><h5 className="text-xs leading-[14.5px] font-bold" >{t("pages.exchange.favourite")}</h5></div>
                <div className="flex items-center gap-2 mt-[14px]">
                    <StarIcon color="#896CFE" />
                    <h4 className="text-sm leading-4 text-[#8F9098]">{t("pages.exchange.favourite_pair")}</h4>
                </div>
            </div>
            <Divider className="mt-4" />
            <div className="max-container !mt-5">
                <div className="w-full bg-deepgray rounded-xl text-center py-3"><h5 className="text-xs leading-[14.5px] font-bold" >{t("pages.exchange.tokens")}</h5></div>
                {/* tokens */}
                <div className="flex flex-col gap-[15px] mt-5">
                    {/* 1 */}
                    <Link to="/boosts/exchange/variants" className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <StarIcon />
                            <h3 className="text-sm text-white leading-4 font-bold">TAXI<span className="font-normal text-[10px] leading-3 text-gray">/TON</span></h3>
                        </div>
                        <div className="flex items-center gap-4 ">
                            <span className="text-sm leading-4 text-right text-white">0.075</span>
                            <span className="text-sm leading-4 text-right text-green">+0.54%</span>
                        </div>
                    </Link>
                    {/* 2 */}
                    <Link to="/boosts/exchange/variants" className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <StarIcon />
                            <h3 className="text-sm text-white leading-4 font-bold">DICE<span className="font-normal text-[10px] leading-3 text-gray">/TON</span></h3>
                        </div>
                        <div className="flex items-center gap-4 ">
                            <span className="text-sm leading-4 text-right text-white">7.011</span>
                            <span className="text-sm leading-4 text-right text-green">+8.43%</span>
                        </div>
                    </Link>
                    {/* 3 */}
                    <Link to="/boosts/exchange/variants" className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <StarIcon />
                            <h3 className="text-sm text-white leading-4 font-bold">VIRUS<span className="font-normal text-[10px] leading-3 text-gray">/TON</span></h3>
                        </div>
                        <div className="flex items-center gap-4 ">
                            <span className="text-sm leading-4 text-right text-white">2682.4</span>
                            <span className="text-sm leading-4 text-right text-red">-2.01%</span>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default BuyBoostExchange
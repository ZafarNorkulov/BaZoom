import { useRef, useState } from "react"
import Divider from "../divider"
import transfer from "../../assets/transfer.png"
import taxi from "../../assets/taxitaxi.jpeg"
import questionGray from "../../assets/question-gray.svg"
import { useTranslation } from "react-i18next"
// import rightGrayArrow from "../../assets/Right0gray-Button.png"

const Trading = () => {
    const [isActive, setIsActive] = useState(true)
    const [price, setPrice] = useState<number>(0)
    const [quantity, setQuantity] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const selectRef = useRef<HTMLSelectElement | null>(null);
    const { t } = useTranslation()

    return (
        <div>
            <div className="max-container flex items-center justify-between">
                <div className="flex flex-col gap-1">

                    <div className="flex items-center gap-[10px]">

                        <div className="flex items-center gap-1">
                            <img src={transfer} className="w-[25px] h-[25px]" />
                            <h2 className="text-white text-[22px] font-extrabold leading-[26.6px]">TAXI <span className="text-gray">/TON</span></h2>
                        </div>
                        <span className="text-xs leading-5 font-semibold text-green">+0.54%</span>
                    </div>
                    <p className="text-[10px] leading-3 "> {t("pages.exchange.trading.volume")}: 1.008М TAXI / 75.36K TON</p>
                </div>
                <div>
                    <img src={taxi} className="w-[35px] h-[35px] rounded-full" />
                </div>
            </div>
            <Divider className="mt-[11px]" />
            <div className="max-container !mt-5 flex gap-5">

                {/* Left content */}
                <div className="flex flex-col gap-[15px] max-w-[101px]">
                    <div className="flex gap-5 ">
                        <div className="flex flex-col gap-[11px] items-center w-[40px]">
                            <span className="text-wrap text-[11px] leading-[14.5px] text-gray text-center w-full h-auto">
                                {t("pages.exchange.trading.price")} <br />(TON)
                            </span>
                            <div className="flex flex-col items-end gap-[6px] text-xs leading-3 text-red">
                                <p>0.0758</p>
                                <p>0.0756</p>
                                <p>0.0755</p>
                                <p>0.0754</p>
                                <p>0.0753</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[11px] items-center w-[41px]">
                            <span className="text-[11px] leading-[14.5px] text-gray text-right">
                                {t("pages.exchange.trading.quantity")}
                                <br />
                                (TAXI)
                            </span>
                            <div className="flex flex-col items-end gap-[6px] text-xs leading-3 text-red">
                                <p>872.2</p>
                                <p>835.9</p>
                                <p>80.626</p>
                                <p>837.0</p>
                                <p>2.3K</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 items-center h-[42px]">
                        <span className="text-lg text-green leading-[22px]">0.0751</span>
                        <span className="text-xs leading-[14.5px] text-white">≈ 0.0750 $</span>
                    </div>

                    <div className="flex gap-5">
                        <div className="flex flex-col items-end gap-[6px] text-xs leading-3 text-green">
                            <p>0.0758</p>
                            <p>0.0756</p>
                            <p>0.0755</p>
                            <p>0.0754</p>
                            <p>0.0753</p>
                        </div>
                        <div className="flex flex-col items-end gap-[6px] text-xs leading-3 text-green">
                            <p>0.0758</p>
                            <p>0.0756</p>
                            <p>0.0755</p>
                            <p>0.0754</p>
                            <p>0.0753</p>
                        </div>
                    </div>
                    <select className=" bg-deepgray h-[30px] text-xs leading-[14.5px] mt-3 px-[9px] rounded-md focus-visible:outline-none">
                        <option value="1" className="">0.0001</option>
                    </select>

                </div>
                {/* Right Content */}
                <div className="flex flex-col w-[222px]">
                    <div className="p-[2px] bg-deepgray rounded-md">
                        <button className={`w-1/2 text-xs leading-[14.5px] font-medium ${isActive && "bg-green text-white"}  rounded-md  py-[6px]`} onClick={() => setIsActive(true)}>{t("pages.exchange.trading.button1")}</button>
                        <button className={`w-1/2 text-xs leading-[14.5px] font-medium ${!isActive && "bg-red text-white"} rounded-md  py-[6px]`} onClick={() => setIsActive(false)}>{t("pages.exchange.trading.button2")}</button>
                    </div>
                    <div className="bg-deepgray w-full flex items-center mt-2 px-[10px] rounded-md">
                        <img src={questionGray} className="w-[15px] h-[15px] rounded-full" />
                        <select ref={selectRef} className="w-full text-center h-8 bg-deepgray ">
                            <option className="w-full bg-deepgray">{t("pages.exchange.trading.limit")}</option>
                            <option className="w-full bg-deepgray">{t("pages.exchange.trading.limit")}</option>
                        </select>

                    </div>
                    {/* Price Input */}
                    <div className="bg-deepgray w-full flex items-center justify-between mt-[3px] px-[10px] py-[6px] rounded-md">
                        <input type="number" value={price} onChange={(e) => setPrice(+e.target.value)} placeholder={`${t("pages.exchange.trading.price")} (TON)`} className="max-w-[150px] h-[20px] w-full bg-deepgray text-sm leading-4 focus-within:outline-none " />
                        <div className="flex items-center gap-[15px]">
                            <button
                                className="text-2xl font-bold"
                                onClick={() => setPrice((prev) => (prev >= 10 ? prev - 10 : prev))} // -10 qilish
                            >
                                -
                            </button>
                            <button
                                className="text-2xl"
                                onClick={() => setPrice((prev) => prev + 10)} // +10 qilish
                            >
                                +
                            </button>
                        </div>
                    </div>
                    {/* Quantity Input */}
                    <div className="bg-deepgray w-full flex items-center justify-between mt-[3px] px-[10px] py-[6px] rounded-md">
                        <input type="number" value={quantity} onChange={(e) => setQuantity(+e.target.value)} placeholder={`${t("pages.exchange.trading.quantity")} (TAXI)`} className="max-w-[150px] h-[20px] w-full bg-deepgray text-sm leading-4 focus-within:outline-none " />
                        <div className="flex items-center gap-[15px]">
                            <button
                                className="text-2xl font-bold"
                                onClick={() => setQuantity((prev) => (prev >= 10 ? prev - 10 : prev))} // -10 qilish
                            >
                                -
                            </button>
                            <button
                                className="text-2xl"
                                onClick={() => setQuantity((prev) => prev + 10)} // +10 qilish
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between mt-1">
                        <div className="flex flex-col gap-[3px] items-center">
                            <div className="w-[53px] bg-deepgray rounded-full h-[14px]" />
                            <span className="text-[10px] leading-3 text-gray">25%</span>
                        </div>
                        <div className="flex flex-col gap-[3px] items-center">
                            <div className="w-[53px] bg-deepgray rounded-full h-[14px]" />
                            <span className="text-[10px] leading-3 text-gray">50%</span>
                        </div>
                        <div className="flex flex-col gap-[3px] items-center">
                            <div className="w-[53px] bg-deepgray rounded-full h-[14px]" />
                            <span className="text-[10px] leading-3 text-gray">75%</span>
                        </div>
                        <div className="flex flex-col gap-[3px] items-center">
                            <div className="w-[53px] bg-deepgray rounded-full h-[14px]" />
                            <span className="text-[10px] leading-3 text-gray">100%</span>
                        </div>


                    </div>

                    {/* Total Input */}

                    <div className="bg-deepgray w-full flex items-center justify-between mt-[15px] px-[10px] py-[6px] rounded-md">
                        <input type="number" value={total} onChange={(e) => setTotal(+e.target.value)} placeholder={`${t("pages.exchange.trading.total")} (TON)`} className="max-w-[150px] h-[20px] w-full bg-deepgray text-sm leading-4 focus-within:outline-none " />
                        <div className="flex items-center gap-[15px]">
                            <button
                                className="text-2xl font-bold"
                                onClick={() => setTotal((prev) => (prev > 10 ? prev - 10 : prev))} // -10 qilish
                            >
                                -
                            </button>
                            <button
                                className="text-2xl"
                                onClick={() => setTotal((prev) => prev + 10)} // +10 qilish
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Balance */}
                    <div className="flex flex-col gap-1 mt-6">

                        <div className="flex justify-between items-center ">
                            <span className="text-xs leading-[14.5px] ">{t("pages.exchange.trading.balance")}</span>
                            <span className="text-white text-xs leading-[14.5px] font-medium">0.742504 TON</span>
                        </div>
                        <button className={`w-full ${isActive ? "bg-green" : "bg-red"}  text-white py-[13px] leading-5 text-center font-bold rounded-[8px]`}>{t("pages.exchange.trading.button1")} TAXI</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Trading
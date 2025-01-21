import { useRef, useState } from "react"
import Divider from "../divider"
import transfer from "../../assets/transfer.png"
import taxi from "../../assets/taxitaxi.jpeg"
import questionGray from "../../assets/question-gray.svg"
// import rightGrayArrow from "../../assets/Right0gray-Button.png"

const Trading = () => {
    const [isActive, setIsActive] = useState(true)

    const selectRef = useRef<HTMLSelectElement | null>(null);

    // const handleIconClick = () => {
    //     if (selectRef.current) {
    //         selectRef.current.click(); // Trigger the opening of the dropdown
    //     }
    // };

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
                    <p className="text-[10px] leading-3 "> 24ч Объём: 1.008М TAXI / 75.36K TON</p>
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
                        <div className="flex flex-col gap-[10px] items-center w-[40px]">
                            <span className="text-wrap text-[11px] leading-[14.5px] text-gray text-center w-full h-auto">
                                Цена <br />(TON)
                            </span>
                            <div className="flex flex-col items-end gap-[3px] text-xs leading-3 text-red">
                                <p>0.0758</p>
                                <p>0.0756</p>
                                <p>0.0755</p>
                                <p>0.0754</p>
                                <p>0.0753</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[10px] items-center w-[41px]">
                            <span className="text-[11px] leading-[14.5px] text-gray text-right">
                                Кол-во
                                <br />
                                (TAXI)
                            </span>
                            <div className="flex flex-col items-end gap-[3px] text-xs leading-3 text-red">
                                <p>872.2</p>
                                <p>835.9</p>
                                <p>80.626</p>
                                <p>837.0</p>
                                <p>2.3K</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 items-center">
                        <span className="text-lg text-green leading-[22px]">0.0751</span>
                        <span className="text-xs leading-[14.5px] text-white">≈ 0.0750 $</span>
                    </div>

                    <div className="flex gap-5">
                        <div className="flex flex-col items-end gap-[3px] text-xs leading-3 text-green">
                            <p>0.0758</p>
                            <p>0.0756</p>
                            <p>0.0755</p>
                            <p>0.0754</p>
                            <p>0.0753</p>
                        </div>
                        <div className="flex flex-col items-end gap-[3px] text-xs leading-3 text-green">
                            <p>0.0758</p>
                            <p>0.0756</p>
                            <p>0.0755</p>
                            <p>0.0754</p>
                            <p>0.0753</p>
                        </div>
                    </div>
                    <select className=" bg-deepgray h-[30px] text-xs leading-[14.5px] px-[9px] rounded-md focus-visible:outline-none">
                        <option value="1" className="">0.0001</option>
                    </select>

                </div>
                {/* Right Content */}
                <div className="flex flex-col w-[222px]">
                    <div className="p-[2px] bg-deepgray rounded-md">
                        <button className={`w-1/2 text-xs leading-[14.5px] font-medium ${isActive && "bg-green text-white"}  rounded-md  py-[6px]`} onClick={() => setIsActive(true)}>Купить</button>
                        <button className={`w-1/2 text-xs leading-[14.5px] font-medium ${!isActive && "bg-red text-white"} rounded-md  py-[6px]`} onClick={() => setIsActive(false)}>Продать</button>
                    </div>
                    <div className="bg-deepgray w-full flex items-center mt-2 px-[10px] rounded-md">
                        <img src={questionGray} className="w-[15px] h-[15px] rounded-full" />
                        <select ref={selectRef} className="w-full text-center h-8 bg-deepgray ">
                            <option className="w-full bg-deepgray">Лимит</option>
                            <option className="w-full bg-deepgray">Лимит</option>
                        </select>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Trading
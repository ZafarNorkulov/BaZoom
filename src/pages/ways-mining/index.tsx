import { useState } from "react";
import Divider from "../../components/divider"
import camera from "./assets/camera.svg"
import forbidden from "./assets/forbidden-svgrepo-com 1.svg"

const WaysOfMining = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value)
        console.log(selectedOption);
    };


    return (
        <section>
            <div className="max-container flex flex-col justify-between gap-5">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2 items-center justify-center mt-6">
                        <h3 className="text-white  text-xl font-black  leading-6">Варианты майнинга</h3>
                        <p className="text-center text-xs leading-4 ">Выберите подходящий  <br />  для вас способ и нажмите на него</p>
                    </div>
                    <div className="cards flex flex-col gap-[10px]">
                        <label className="card bg-deepgray rounded-[10px]">
                            <div className="header flex items-center justify-between p-[15px] pb-[10px]">
                                <div className="flex items-start gap-[10px]">

                                    <input type="radio" name="radio" value="1" className="appearance-none w-4 h-4 rounded-full border border-gray checked:bg-green" onChange={handleChange} />
                                    <div className="flex flex-col">

                                        <span className="text-xs leading-[14.5px] ">Вариант №1</span>
                                        <h5 className="text-sm leading-[17px] font-black text-white">Со сканированием лица</h5>
                                    </div>
                                </div>
                                <img src={camera} alt="" />


                            </div>
                            <Divider />
                            <div className="px-4 pt-3 pb-[10px]">

                                <p className="text-xs leading-[14.5px] text-[#e5e5e5]">В 10 раз более прибыльный майнинг путём создания фото твоего лица при добыче $DICE из блока твоей памяти, также с последующим созданием из них видео клипа.</p>
                            </div>
                        </label>
                        <label className="card bg-deepgray rounded-[10px]">
                            <div className="header flex items-center justify-between p-[15px] pb-[10px]">
                                <div className="flex items-start gap-[10px]">

                                    <input type="radio" name="radio" value="2" className="appearance-none w-4 h-4 rounded-full border border-gray checked:bg-green" onChange={handleChange} />
                                    <div className="flex flex-col">

                                        <span className="text-xs leading-[14.5px] ">Вариант №2</span>
                                        <h5 className="text-sm leading-[17px] font-black text-white">Без сканирования лица</h5>
                                    </div>
                                </div>
                                <img src={forbidden} alt="" />


                            </div>
                            <Divider />
                            <div className="px-4 py-3">

                                <p className="text-xs leading-[14.5px] text-[#e5e5e5]">Майнинг путём загрузки созданных тобой фотографии с задней камеры смартфона с последующей автоматической конвертации их в видео.</p>
                            </div>
                        </label>
                    </div>
                </div>
                {/* <FaceDetector/> */}
            
                <div className="text-center py-4 bg-black rounded-xl">
                    <span className="text-xs leading-[14.5px] font-semibold">Выберите вариант майнинга для подтверждения</span>
                </div>
            </div>
        </section>
    )
}

export default WaysOfMining
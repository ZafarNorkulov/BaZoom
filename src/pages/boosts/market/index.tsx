import { useState } from "react"
import BackPage from "../../../components/backPage"
import StarIcon from "../../../components/icons/star"
import QuestionModal from "../../../components/modals/questionModal"
import { useTranslation } from "react-i18next"




const BuyBoostMarket = () => {
  const [open, setOpen] = useState(false)
  const [datas, setDatas] = useState([
    {
      id: 1,
      title: "Taxi",
      sub: "ton",
      count: 100
    },
    {
      id: 2,
      title: "Virus",
      sub: "ton",
      count: 100
    },
    {
      id: 3,
      title: "Dice",
      sub: "ton",
      count: 100
    },
  ])

  const { t } = useTranslation()
  return (
    <section>
      <BackPage title={t("pages.boostMarket.head")} />
      <div className="max-container">
        <div className="block w-full py-3 bg-deepgray rounded-xl text-center mt-[30px]">{t("pages.boostMarket.choosingToken")}</div>
        <div className="flex flex-col gap-[15px] mt-5">
          {datas?.map(item => (

            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap-[9px]">

                <StarIcon />
                <h3 className="flex text-sm text-white font-bold uppercase">{item.title} <span className="text-[10px] font-normal text-[#939393]">/{item.sub}</span></h3>
              </div>
              <div className="flex gap-1">
                <button
                  className="w-7 h-7 text-center text-2xl leading-3 bg-[#896CFE73] rounded-[6px] text-[#896CFE]"
                  onClick={() =>
                    setDatas((prev) =>
                      prev.map((element) =>
                        element.id === item.id ? { ...element, count: element.count - 10 } : element
                      )
                    )
                  }
                >-</button>
                <button className="text-[10px] w-[83px] leading-3 font-semibold py-2 text-center text-white rounded-[6px] bg-[#896CFE]"
                  onClick={() => setOpen(true)}
                >{t("pages.boostMarket.buy")} {item.count}</button>
                <button className="w-7 h-7 text-center text-2xl leading-3 bg-[#896CFE73] rounded-[6px] text-[#896CFE]"
                  onClick={() =>
                    setDatas((prev) =>
                      prev.map((element) =>
                        element.id === item.id ? { ...element, count: element.count + 10 } : element
                      )
                    )
                  }>+</button>
              </div>
            </div>
          ))}

        </div>

      </div>
      <QuestionModal open={open} setOpen={setOpen} title={t("pages.boostMarket.modalTitle")} text={t("pages.boostMarket.modalText")} url="/" buttonText={t("pages.boostMarket.confirm")} />
    </section>
  )
}

export default BuyBoostMarket
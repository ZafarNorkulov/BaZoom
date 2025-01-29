import { useTranslation } from "react-i18next"
import BackPage from "../../components/backPage"
import { HistoryProps } from "./history.type"
import HistoryItem from "./historyItem"


const History = () => {
    const { t } = useTranslation()

    const datas: HistoryProps[] = [
        {
            id: 1,
            bid: "48 <",
            status: "win",
            dropped: 36,
            price: [
                {
                    type: "dice",
                    value: 500,
                    priceStatus: "win",
                }
            ],
            time: "11 дек, 18:40"
        },
        {
            id: 2,
            bid: "48 <",
            status: "win",
            dropped: 18,
            price: [
                {
                    type: "dice",
                    value: 20,
                    priceStatus: "win"
                }
            ],
            time: "11 дек, 18:35"
        },
        {
            id: 3,
            bid: "52 >",
            status: "lose",
            dropped: 5,
            price: [
                {
                    type: "taxi",
                    value: 13,
                    priceStatus: "win"
                },

                {
                    type: "ton",
                    value: 13,
                    priceStatus: "win"
                },
                {
                    type: "dice",
                    value: 200,
                    priceStatus: "lose"
                },


            ],
            time: "11 дек, 18:30"
        },
        {
            id: 4,
            bid: "52 >",
            status: "win",
            dropped: 53,
            price: [
                {
                    type: "dice",
                    value: 100,
                    priceStatus: "win"
                },
            ],
            time: "11 дек, 18:20"
        },
        {
            id: 5,
            bid: "48 <",
            status: "win",
            dropped: 36,
            price: [{
                type: "dice",
                value: 500,
                priceStatus: "win"
            }],
            time: "11 дек, 18:15"
        },
        {
            id: 6,
            bid: "48 <",
            status: "win",
            dropped: 18,
            price: [{
                type: "dice",
                value: 20,
                priceStatus: "win"
            }],
            time: "11 дек, 18:00"
        },
        {
            id: 7,
            bid: "52 >",
            status: "lose",
            dropped: 5,
            price: [
                {
                    type: "taxi",
                    value: 13,
                    priceStatus: "win"
                },

                {
                    type: "ton",
                    value: 13,
                    priceStatus: "win"
                },
                {
                    type: "dice",
                    value: 200,
                    priceStatus: "lose"
                },


            ],
            time: "11 дек, 18:30"
        },
        {
            id: 8,
            bid: "52 >",
            status: "lose",
            dropped: 5,
            price: [
                {
                    type: "taxi",
                    value: 13,
                    priceStatus: "win"
                },

                {
                    type: "ton",
                    value: 13,
                    priceStatus: "win"
                },
                {
                    type: "dice",
                    value: 200,
                    priceStatus: "lose"
                },


            ],
            time: "11 дек, 18:30"
        },
    ]
    return (
        <section>
            <BackPage title={t("pages.history.head")} />
            <div className="max-container !mt-[30px]">
                <div className="flex flex-col gap-[15px]">
                    {datas?.map(item => (

                        <HistoryItem key={item.id} bid={item.bid} dropped={item.dropped} price={item.price} status={item.status} time={item.time} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default History
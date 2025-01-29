export type HistoryProps ={
    id?:number,
    bid: string,
    status: "win" | "lose",
    dropped: number,
    price: typePrice[],
    time: string
}
interface typePrice {
    type: "dice" | "ton" | "taxi",
    value: number,
    priceStatus: "win" | "lose"
}
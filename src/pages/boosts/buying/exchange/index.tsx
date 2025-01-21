import { useState } from "react";
import Divider from "../../../../components/divider";
import Trading from "../../../../components/exchange/trading";
import Orders from "../../../../components/exchange/orders";
import Grafic from "../../../../components/exchange/grafic";

const BuyBoostExchange = () => {

  const [tabs, setTabs] = useState([
    {
      id: 1,
      title: "Торговля",
      active: true
    },
    {
      id: 2,
      title: "Открытые ордера (0)",
      active: false
    },
    {
      id: 3,
      title: "TAXI/TON график",
      active: false
    },
  ]);
console.log(tabs)
  const handleTabClick = (id: number) => {
    // Yangilangan massivni yaratamiz
    const updatedTabs = tabs.map((tab) =>
      tab.id === id ? { ...tab, active: true } : { ...tab, active: false }
    );
    setTabs(updatedTabs); // Yangilangan massivni set qilamiz
  };

  return <section>
    <div className="max-container">
      <div className="flex justify-between mt-2">
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
    <div className="content mt-3">
      {tabs.filter((tab) => tab.active).map((tab, index) => (
        tab.id === 1 ? <Trading key={index} /> : tab.id === 2 ? <Orders /> : <Grafic />
      ))}
    </div>

  </section>;
};

export default BuyBoostExchange;

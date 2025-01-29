import { useState } from "react";
import Divider from "../../../../components/divider";
import Trading from "../../../../components/exchange/trading";
import Orders from "../../../../components/exchange/orders";
import Grafic from "../../../../components/exchange/grafic";
import { useTranslation } from "react-i18next";

const ExchangeVariants = () => {
  const { t } = useTranslation()

  const [tabs, setTabs] = useState([
    {
      id: 1,
      title: t("pages.exchange.tabs.tab1"),
      active: true
    },
    {
      id: 2,
      title: `${t("pages.exchange.tabs.tab2")} (2)`,
      active: false
    },
    {
      id: 3,
      title: `TAXI/TON ${t("pages.exchange.tabs.tab3")}`,
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

export default ExchangeVariants;

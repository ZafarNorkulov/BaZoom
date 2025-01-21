import React from "react";
import ReactECharts from "echarts-for-react";

const Grafic: React.FC = () => {
    const options = {
        tooltip: {
            trigger: "item",
            axisPointer: {
                type: "shadow", // Pointer turi
            },
        },
        xAxis: {
            type: "value", // Sonli qiymatlar
          min:8,
          max:16,
            axisLine: { lineStyle: { color: "#1A1A1B66" } },
            axisLabel: {
                formatter: "{value}",
                color: "#939393"
            },
            splitLine: { lineStyle: { color: "#1A1A1B66" } }
        },
        yAxis: {
            type: "value",
            position: "right",
            scale: true,
            axisLine: { lineStyle: { color: "#1A1A1B66" } },
            splitLine: { lineStyle: { color: "#1A1A1B66" } },
            axisLabel: {
                color: "#939393"
            }
        },
        grid: {
            left: "10%",
            right: "10%",
            bottom: "15%",
        },
        series: [
            {
                type: "candlestick",
                data: [
                    [8.2, 0.062, 0.078, 0.06, 0.085], // [open, close, low, high]
                    [9, 0.085, 0.075, 0.072, 0.093],
                    [10, 0.075, 0.086, 0.072, 0.087],
                    [11, 0.086, 0.072, 0.055, 0.089],
                    [12, 0.073, 0.059, 0.054, 0.076],
                    [13, 0.065, 0.080, 0.058, 0.087],
                    [14, 0.086, 0.072, 0.055, 0.089],
                    [15, 0.085, 0.075, 0.072, 0.093],
                ],
                itemStyle: {
                    color: "#4CAF50", // Ko'tarilish rangi (yashil)
                    color0: "#F44336", // Tushish rangi (qizil)
                    borderColor: "#4CAF50",
                    borderColor0: "#F44336",
                },
                barWidth: 15, // Bar kengligi
            },
        ],
    };

    return (
        <div className="max-container !mt-[14px]">
            {/* Times */}
            <div className="flex items-center gap-[5px]">
                <button className="py-1 px-[10px] border-[1.2px] border-transparent bg-deepgray rounded-[8px] text-xs leading-[14.5px] font-medium text-white">1м</button>
                <button className="py-1 px-[10px] border-[1.2px] border-transparent bg-deepgray rounded-[8px] text-xs leading-[14.5px] font-medium text-white">5м</button>
                <button className="py-1 px-[10px] border-[1.2px] border-transparent bg-deepgray rounded-[8px] text-xs leading-[14.5px] font-medium text-white">15м</button>
                <button className="py-1 px-[10px] border-[1.2px] border-transparent bg-deepgray rounded-[8px] text-xs leading-[14.5px] font-medium text-white">30м</button>
                <button className="py-1 px-[10px] border-[1.2px] border-transparent bg-deepgray rounded-[8px] text-xs leading-[14.5px] font-medium text-white">1ч</button>
                <button className="py-1 px-[10px] border-[1.2px] border-transparent bg-deepgray rounded-[8px] text-xs leading-[14.5px] font-medium text-white">5ч</button>
                <button className="py-1 px-[10px] border-[1.2px] border-purple bg-deepgray rounded-[8px] text-xs leading-[14.5px] font-medium text-white">12ч</button>
                <button className="py-1 px-[10px] border-[1.2px] border-transparent bg-deepgray rounded-[8px] text-xs leading-[14.5px] font-medium text-white">1д</button>
            </div>

            {/* Grafic */}
            <div className="w-full h-[400px] bg-deepgray rounded-[10px] mt-[10px] pr-3 " >
                {/* Container with responsive width */}
                <ReactECharts option={options} style={{ width: "100%", height: "100%" }} />
            </div>
        </div>
    );
};

export default Grafic;

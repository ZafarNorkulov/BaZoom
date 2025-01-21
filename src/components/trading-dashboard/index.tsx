import ReactECharts from "echarts-for-react";

const ShanghaiIndexChart = () => {
  const options = {
   
    tooltip: {
      trigger: "item",
      axisPointer: {
        type: "shadow", // Pointer turi
      },
    },
    xAxis: {
      type: "category", // Sonli qiymatlar
      data: [8, 9, 10, 11, 12, 13],
      axisLine: { lineStyle: { color: "#aaa" } },
      axisLabel: {
        formatter: "{value}",
      },
    },
    yAxis: {
      type: "value",
      position: "right",
      scale: true,
      axisLine: { lineStyle: { color: "#aaa" } },
      splitLine: { lineStyle: { color: "#000" } },
    },
    grid: {
      left: "10%",
      right: "10%",
      bottom: "15%",
    },
    series: [
      {
        name: "Shanghai Index",
        type: "candlestick",
        data: [
          [0.062, 0.078, 0.06, 0.085], // [open, close, low, high]
          [0.085, 0.075, 0.072, 0.093],
          [0.075, 0.086, 0.072, 0.087],
          [0.086, 0.072, 0.055, 0.089],
          [0.073, 0.059, 0.054, 0.076],
          [0.073, 0.059, 0.054, 0.076],
          [0.086, 0.072, 0.055, 0.089],
          [0.085, 0.075, 0.072, 0.093],
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
    <ReactECharts option={options} style={{ height: 400, width: "100%" }} />
  );
};

export default ShanghaiIndexChart;

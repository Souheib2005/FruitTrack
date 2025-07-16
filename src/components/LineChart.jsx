import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";
import { useTranslation } from "react-i18next";
import { productNames } from "../i18n/productMap";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function LineChart({ data, selectedProduct, selectedCurrency, conversionRates }) {
  const { t, i18n } = useTranslation();

  const filteredData = data.filter(item => item.product === selectedProduct);

  const chartData = {
    labels: filteredData.map(item => item.year),
    datasets: [
      {
        label: `${productNames[selectedProduct][i18n.language]} (${selectedCurrency})`,
        data: filteredData.map(item => (item.price * conversionRates[selectedCurrency]).toFixed(2)),
        fill: false,
        borderColor: "#007bff",
        tension: 0.3,
      },
    ],
  };

  return (
    <div>
      <h3>{t("lineChartTitle")}</h3>
      <Line data={chartData} />
    </div>
  );
}

export default LineChart;

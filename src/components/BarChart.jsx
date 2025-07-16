import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { useTranslation } from "react-i18next";
import { productNames } from "../i18n/productMap";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function BarChart({ data, selectedYear, selectedCurrency, conversionRates }) {
  const { t, i18n } = useTranslation();

  const filteredData = data.filter(item => item.year === parseInt(selectedYear));

  const chartData = {
    labels: filteredData.map(item => productNames[item.product][i18n.language]),
    datasets: [
      {
        label: `${selectedYear} (${selectedCurrency})`,
        data: filteredData.map(item => (item.price * conversionRates[selectedCurrency]).toFixed(2)),
        backgroundColor: "#28a745",
      },
    ],
  };

  return (
    <div>
      <h3>{t("barChartTitle")}</h3>
      <Bar data={chartData} />
    </div>
  );
}

export default BarChart;

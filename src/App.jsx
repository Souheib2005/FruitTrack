import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./i18n";
import { foodPrices } from "./data/foodData";
import { productNames } from "./i18n/productMap";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import "./App.css";

function App() {
  const { t, i18n } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState("Tomatoes");
  const [selectedYear, setSelectedYear] = useState("2020");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const conversionRates = {
    USD: 1,
    CAD: 1.34,
    EUR: 0.92,
  };

  const handleLangChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const uniqueProducts = [...new Set(foodPrices.map((item) => item.product))];
  const uniqueYears = [...new Set(foodPrices.map((item) => item.year))];

  const avgPrice = () => {
    const productData = foodPrices.filter(item => item.product === selectedProduct);
    const prices = productData.map(d => d.price * conversionRates[selectedCurrency]);
    return prices.length > 0
      ? (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2)
      : "-";
  };

  const downloadCharts = () => {
    window.print();
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="App">
      <div className="overlay">
        <img src="/logo.png" alt="Logo" className="logo-top" />

        <h1>{t("title")}</h1>
        <p className="description">{t("description")}</p>

        {/* Controls Row */}
        <div className="controls-row">
          <div>
            <label>🌐</label>
            <select onChange={handleLangChange} defaultValue="en">
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>

          <div>
            <label>{t("selectProduct")}: </label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              title={`EN: ${productNames[selectedProduct]?.en}, FR: ${productNames[selectedProduct]?.fr}`}
            >
              {uniqueProducts.map((product) => (
                <option key={product} value={product}>
                  {productNames[product]?.[i18n.language] || product}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>{t("selectYear")}: </label>
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              {uniqueYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>{t("selectCurrency")}: </label>
            <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}>
              <option value="USD">USD</option>
              <option value="CAD">CAD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
        </div>

        {/* Charts Row */}
        <div className="charts-wrapper">
          <div className="chart-container">
            <LineChart
              data={foodPrices}
              selectedProduct={selectedProduct}
              selectedCurrency={selectedCurrency}
              conversionRates={conversionRates}
            />
          </div>
          <div className="chart-container">
            <BarChart
              data={foodPrices}
              selectedYear={selectedYear}
              selectedCurrency={selectedCurrency}
              conversionRates={conversionRates}
            />
          </div>
        </div>

        {/* Extra Info */}
        <div className="info-summary">
          <p>
            📊 {t("averagePrice")}: <strong>
              {selectedCurrency === "EUR" ? "€" : "$"}{avgPrice()} {selectedCurrency}
            </strong>
          </p>
          <button onClick={downloadCharts}>{t("downloadCharts")}</button>
        </div>

        {/* Feedback Form */}
        <div className="feedback-form" style={{ marginTop: "2rem" }}>
          <h3>{t("feedbackTitle")}</h3>
          {!submitted ? (
            <form onSubmit={handleFeedbackSubmit}>
              <textarea
                placeholder={t("feedbackPlaceholder")}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="3"
                cols="50"
                required
              />
              <br />
              <button type="submit">{t("submitFeedback")}</button>
            </form>
          ) : (
            <p>{t("thankYouFeedback")}</p>
          )}
        </div>

        {/* Footer */}
        <footer style={{ marginTop: "3rem", fontSize: "0.9rem", color: "#555" }}>
          {i18n.language === "fr"
            ? "© 2025 Site créé par Souheib Al-Ahdal – Tous droits réservés."
            : "© 2025 Website created by Souheib Al-Ahdal – All rights reserved."}
        </footer>
      </div>
    </div>
  );
}

export default App;

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Coin.css";
import { CoinContext } from "../../../context/CoinContext";
import LineChart from "../../../components/LineChart";

const Coin = () => {
  const { coinId } = useParams();
  const [coindata, setCoinData] = useState(null);
  const [historicaldata, setHistoricalData] = useState(null);
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": import.meta.env.VITE_CG_API_KEY,
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((res) => res.json())
      .then((res) => {
        setCoinData(res);
      })
      .catch((err) => console.error(err));
  };

  const fetchHistoricalData = async () => {
    if (!currency?.name) return; // don’t fetch until currency is ready

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": import.meta.env.VITE_CG_API_KEY,
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("Historical data:", res);
        setHistoricalData(res);
      })
      .catch((err) => console.error("History fetch error:", err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency, coinId]);

  if (!coindata || !historicaldata) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }

  return (
    <div className="coin">
      <div data-aos="fade-right" className="coin-left">
        <img className="coin-logo" src={coindata?.image?.large} alt={coindata?.name} />
        <div className="coin-name-below">
          {coindata?.name}
          <span className="coin-symbol"> ({coindata?.symbol?.toUpperCase()})</span>
        </div>
        <div className="coin-chart">
          <LineChart historicaldata={historicaldata} />
        </div>
      </div>
      <div data-aos="fade-left" className="coin-right">
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coindata.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>
              {currency.Symbol}
              {coindata.market_data.current_price[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>
              {currency.Symbol}
              {coindata.market_data.market_cap[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour high</li>
            <li>
              {currency.Symbol}
              {coindata.market_data.high_24h[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour low</li>
            <li>
              {currency.Symbol}
              {coindata.market_data.low_24h[currency.name].toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Coin;

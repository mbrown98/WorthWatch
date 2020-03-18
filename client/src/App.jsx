import React from "react";
import axios from "axios";

import CurrentPrice from "./components/CurrentPrice.jsx";
import CurrencySelect from "./components/CurrencySelect.jsx";
var Chart = require("chart.js");
import runtime from "regenerator-runtime";
import OtherCurrencies from "./components/OtherCurrencies";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      USD: null,
      GBP: null,
      EUR: null,
      currentCurrency: "USD",
      prices: [],
      dates: []
    };

    this.getCurrentPrices = this.getCurrentPrices.bind(this);
    this.getPastPrices = this.getPastPrices.bind(this);
  }
  componentDidMount() {
    this.getCurrentPrices();
    this.getPastPrices("USD");
    setInterval(this.getCurrentPrices, 222000);
  }

  async getCurrentPrices() {
    try {
      console.log("current prices run");
      const response = await axios.get(
        "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,LTC,XRP,BCH&tsyms=USD,EUR,GBP"
      );
      console.log(response);

      this.setState({
        USD: response.data.DISPLAY.BTC.USD.PRICE,
        GBP: response.data.DISPLAY.BTC.GBP.PRICE,
        EUR: response.data.DISPLAY.BTC.EUR.PRICE
      });
    } catch (e) {
      console.log(e);
    }
  }

  getPastPrices(val) {
    this.setState({ currentCurrency: val });
    axios
      .get(
        `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${val}`
      )
      .then(response => {
        let obj = {};
        obj.prices = Object.values(response.data.bpi);
        obj.dates = Object.keys(response.data.bpi);
        return obj;
      })
      .then(obj => {
        const node = this.node;
        var myChart = new Chart(node, {
          type: "line",
          data: {
            labels: obj.dates,
            datasets: [
              {
                label: "Bitcoin Price",
                data: obj.prices,
                backgroundColor: [
                  "rgba(5, 120, 133333, 0.4)",
                  "rgba(5, 120, 235, 0.4)",
                  "rgba(5, 120, 86, 0.2)"
                ]
              }
            ]
          }
        });
      });
  }

  render() {
    return (
      <div>
        <div>
          {" "}
          <section class="hero is-link">
            <div class="hero-body">
              <div class="container">
                <h1 class="title">CryptoTracker</h1>
                <h2 class="subtitle">Powered by CoinDesk</h2>
              </div>
            </div>
          </section>
        </div>
        <div id="page">
          {" "}
          <div id="notChart">
            {" "}
            <div id="currencyWrapper">
              {" "}
              <div id="first">
                {" "}
                <CurrencySelect setCurrency={this.getPastPrices} />
              </div>
            </div>
            <OtherCurrencies currentCurrency={this.state.currentCurrency} />
          </div>
          <div id="chart">
            {" "}
            <canvas ref={node => (this.node = node)} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import React from "react";
import axios from "axios";

import CurrentPrice from "./components/CurrentPrice.jsx";
import CurrencySelect from "./components/CurrencySelect.jsx";
var Chart = require("chart.js");

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
  }

  getCurrentPrices() {
    axios.get("/crypto/currentPrices").then(response => {
      this.setState({ USD: response.data.bpi.USD.rate_float });
      this.setState({ GBP: response.data.bpi.GBP.rate_float });
      this.setState({ EUR: response.data.bpi.EUR.rate_float });
    });
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
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)"
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
        <h1>CryptoTracker</h1>
        <CurrencySelect setCurrency={this.getPastPrices} />
        <CurrentPrice
          USD={this.state.USD}
          GBP={this.state.GBP}
          EUR={this.state.EUR}
          currency={this.state.currentCurrency}
        />
        <canvas
          style={{ width: 800, height: 300 }}
          ref={node => (this.node = node)}
        />
        <h5>Powered by CoinDesk</h5>
      </div>
    );
  }
}

export default App;

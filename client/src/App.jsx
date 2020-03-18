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
    setInterval(this.getCurrentPrices, 5000);
  }

  async getCurrentPrices() {
    try {
      console.log("current prices run");
      const response = await axios.get(
        "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,XRP,BCH&tsyms=USD,EUR,GBP"
      );

      this.setState({
        USD: response.data.BTC.USD,
        GBP: response.data.BTC.GBP,
        EUR: response.data.BTC.EUR
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
        <OtherCurrencies />
        <div>
          <h1 style={{ fontSize: "20px" }}>{"Select Currency"}</h1>
        </div>

        <div id="currencyWrapper">
          {" "}
          <div id="first">
            {" "}
            <CurrencySelect setCurrency={this.getPastPrices} />
          </div>
          <div id="second">
            {" "}
            <CurrentPrice
              USD={this.state.USD}
              GBP={this.state.GBP}
              EUR={this.state.EUR}
              currency={this.state.currentCurrency}
            />
          </div>
        </div>

        <canvas
          style={{ width: 400, height: 120 }}
          ref={node => (this.node = node)}
        />
      </div>
    );
  }
}

export default App;

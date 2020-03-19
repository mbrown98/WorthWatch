import React from "react";
import axios from "axios";

var Chart = require("chart.js");
import runtime from "regenerator-runtime";
import OtherCurrencies from "./components/OtherCurrencies";

import DatePicker from "./components/DatePicker.jsx";

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
    // this.getPastPrices = this.getPastPrices.bind(this);
    this.populateChart = this.populateChart.bind(this);
  }
  componentDidMount() {
    this.getCurrentPrices();
    this.getPastPrices("USD");
    // setInterval(this.getCurrentPrices, 1000);
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

  populateChart(val1, val2, curr) {
    console.log("values", val1, val2);
    axios
      .get(
        `https://api.nomics.com/v1/currencies/sparkline?key=demo-26240835858194712a4f8cc0dc635c7a&ids=${curr}&start=${val1}T00%3A00%3A00Z&end=${val2}T00%3A00%3A00Z`
      )
      .then(response => {
        let obj = {};
        obj.prices = response.data[0].prices;

        obj.dates = response.data[0].timestamps.map(date => date.slice(0, 10));

        console.log(obj);
        return obj;
      })
      .then(obj => {
        const node = this.node;
        var newChart = new Chart(node, {
          type: "line",
          data: {
            labels: obj.dates,
            datasets: [
              {
                label: curr + " Price",
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

  getPastPrices(val) {
    this.setState({ currentCurrency: val });
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

        <div id="topHalf">
          {" "}
          <div id="notChart" className="box">
            {" "}
            <div id="currencyWrapper">
              <h1 class="title">Currency Converter</h1> <div id="first"> </div>
            </div>
            <OtherCurrencies currentCurrency={this.state.currentCurrency} />
          </div>
          <div id="chart" className="box">
            {" "}
            <div>
              {" "}
              <h1 class="title">Tracker</h1>
              <DatePicker populateChart={this.populateChart} />
              {/* <DatesGraph chartSwitcher={this.populateChart} /> */}
            </div>
            <div>
              {" "}
              <canvas id="theChart" ref={node => (this.node = node)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

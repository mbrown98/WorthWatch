import React from "react";
import axios from "axios";
import Navigation from "./Navigation.jsx";
var Chart = require("chart.js");

export default class Stocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockSearch: "",
      searchedData: [],
      time: "DAIlY",
      dailyValues: null,
      monthlyValues: null,
      weeklyValues: null
    };
    this.handleChange = this.handleChange.bind(this);

    this.getHistStockInfo = this.getHistStockInfo.bind(this);
  }

  handleChange(event) {
    this.setState({
      stockSearch: event.target.value,
      dailyValues: null,
      monthlyValues: null,
      weeklyValues: null
    });
  }

  getHistStockInfo() {
    console.log("serarch", this.state.stockSearch);
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_${this.state.time}&symbol=${this.state.stockSearch}&apikey=X56VBGT3RVIY8K94`
      )
      .then(response => {
        let histData = "";
        if (this.state.time === "DAILY") {
          if (this.state.dailyValues !== null) {
            return this.state.dailyValues;
          }
          histData = response.data["Time Series (Daily)"];
          let obj = {};
          let initialDates = Object.keys(histData);
          obj.dates = initialDates.reverse();
          let pricesRawInitial = Object.values(histData);
          let pricesRaw = pricesRawInitial.reverse();
          obj.name = this.state.stockSearch;
          obj.prices = pricesRaw.map(element => Number(element["2. high"]));
          this.setState({ dailyValues: obj });
          return obj;
        } else if (this.state.time === "WEEKLY") {
          if (this.state.weeklyValues !== null) {
            return this.state.weeklyValues;
          }
          histData = response.data["Weekly Time Series"];
          let obj = {};
          let initialDates = Object.keys(histData).slice(0, 20);
          obj.dates = initialDates.reverse();
          let pricesRawInitial = Object.values(histData).slice(0, 20);
          let pricesRaw = pricesRawInitial.reverse();
          obj.name = this.state.stockSearch;
          obj.prices = pricesRaw.map(element => Number(element["2. high"]));
          this.setState({ weeklyValues: obj });
          return obj;
        } else if (this.state.time === "MONTHLY") {
          if (this.state.monthlyValues !== null) {
            return this.state.monthlyValues;
          }
          histData = response.data["Monthly Time Series"];
          let obj = {};
          let initialDates = Object.keys(histData).slice(0, 20);
          obj.dates = initialDates.reverse();
          let pricesRawInitial = Object.values(histData).slice(0, 20);
          let pricesRaw = pricesRawInitial.reverse();
          obj.name = this.state.stockSearch;
          obj.prices = pricesRaw.map(element => Number(element["2. high"]));
          this.setState({ monthlyValues: obj });
          return obj;
        }
      })
      .then(obj => {
        console.log(obj);
        const node = this.node;
        var newChart = new Chart(node, {
          type: "line",
          data: {
            labels: obj.dates,
            datasets: [
              {
                label: obj.name,
                data: obj.prices,
                backgroundColor: [
                  "rgba(5, 120, 133333, 0.4)",
                  "rgba(5, 120, 235, 0.4)",
                  "rgba(5, 120, 86, 0.2)"
                ]
              }
            ]
          },
          options: {
            maintainAspectRatio: false
          }
        });
      });
  }

  render() {
    return (
      <div>
        <div>
          <Navigation />
          <div>
            {" "}
            <section class="hero is-link">
              <div class="hero-body">
                <div class="container">
                  <h1 class="title">StockWatch</h1>
                  <h4 class="subtitle">
                    Based on API limits you can search full data for one stock
                    per minute
                  </h4>
                </div>
              </div>
            </section>
          </div>

          <div id="stockSearch">
            <form onSubmit={this.handleSubmit}>
              <label>
                Stock Symbol: {"  "}
                <input
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </label>
            </form>
          </div>
        </div>
        <div className="field is-grouped">
          {/* <a
            className="button is-danger"
            onClick={() => {
              console.log("hello");
            }}
          >
            Hourly
          </a> */}
          <a
            className="button is-link"
            onClick={() => {
              this.setState({ time: "DAILY" }, () => this.getHistStockInfo());
            }}
          >
            Daily
          </a>
          <a
            className="button is-primary"
            onClick={() => {
              this.setState({ time: "WEEKLY" }, () => this.getHistStockInfo());
            }}
          >
            Weekly
          </a>
          <a
            className="button is-primary"
            onClick={() => {
              console.log("hellllloooo");
              this.setState({ time: "MONTHLY" }, () => this.getHistStockInfo());
            }}
          >
            Monthly
          </a>
        </div>
        <div>
          {" "}
          <canvas id="stockChart" ref={node => (this.node = node)} />
        </div>
      </div>
    );
  }
}

// let data = response.data.data[0];
// let obj = {};
// obj.name = data.name;
// obj.symbol = data.symbol;
// obj.price = data.price;
// obj.day_high = data.day_high;
// obj.day_low = data.day_low;
// obj.day_change = data.change_pct;
// obj.hist_high = data["52_week_high"];
// obj.hist_low = data["52_week_low"];
// console.log(obj);
// var newSearchedData = [...this.state.searchedData, obj];
// this.setState({ searchedData: newSearchedData });

// hourly: https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo

// daily: https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo
// weekly: https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=MSFT&apikey=demo
// monthly: https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=MSFT&apikey=demo

// hourly: INTRADAY & interval=5min
// daily: DAILY
// weekly: WEEKLY
// monthly: MONTHLY

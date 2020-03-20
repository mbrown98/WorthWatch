import React from "react";
import axios from "axios";
import Navigation from "./Navigation.jsx";
var Chart = require("chart.js");

export default class Stocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockSearch: "",
      searchedData: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getHistStockInfo = this.getHistStockInfo.bind(this);
  }

  handleChange(event) {
    this.setState({ stockSearch: event.target.value });
  }

  handleSubmit(event) {
    console.log(this.state.stockSearch);
    this.getHistStockInfo(this.state.stockSearch);
    event.preventDefault();
  }

  getHistStockInfo(name) {
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${name}&apikey=X56VBGT3RVIY8K94`
      )
      .then(response => {
        let histData = response.data["Time Series (Daily)"];
        let obj = {};
        let initialDates = Object.keys(histData);
        obj.dates = initialDates.reverse();
        let pricesRawInitial = Object.values(histData);
        let pricesRaw = pricesRawInitial.reverse();
        obj.prices = pricesRaw.map(element => Number(element["2. high"]));
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
                label: "Stock",
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
          <Navigation />
          <div>
            {" "}
            <section class="hero is-link">
              <div class="hero-body">
                <div class="container">
                  <h1 class="title">StockWatch</h1>
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
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
        <div>
          <table class="table has-text-left">
            <thead>
              <th></th>

              <th>Symbol</th>
              <th>Price</th>
              <th>Day High</th>
              <th>Day Low</th>
              <th>Day Change</th>
              <th>52 Week High</th>
              <th>52 Week Low</th>
            </thead>
            <tbody>
              {this.state.searchedData.map(stock => {
                return (
                  <tr>
                    <th>
                      <a onClick={() => console.log("hello")}>{stock.name}</a>
                    </th>
                    <td>{stock.symbol}</td>
                    <td>{stock.price}</td>
                    <td>{stock.day_high}</td>
                    <td>{stock.day_low}</td>
                    <td>{stock.day_change}</td>
                    <td>{stock.hist_high}</td>
                    <td>{stock.hist_low}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
          {" "}
          <canvas id="theChart" ref={node => (this.node = node)} />
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

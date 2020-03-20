import React from "react";
import axios from "axios";
import Navigation from "./Navigation.jsx";

var Chart = require("chart.js");
import runtime from "regenerator-runtime";
import OtherCurrencies from "./OtherCurrencies";

import DatePicker from "./DatePicker";

export default class Watching extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <div>
        <Navigation />
        <div>
          {" "}
          <section class="hero is-link">
            <div class="hero-body">
              <div class="container">
                <h1 class="title">Watching</h1>
                <h2 class="subtitle">Stocks you are following</h2>
              </div>
            </div>
          </section>
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
              {/* {this.state.searchedData.map(stock => {
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
              })} */}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

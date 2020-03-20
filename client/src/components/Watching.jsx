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
      </div>
    );
  }
}

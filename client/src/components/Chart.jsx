import React from "react";
var Chart = require("chart.js");
import axios from "axios";

class CryptoChart extends React.Component {
  constructor(props) {
    super(props);
    this.getPastPrices = this.getPastPrices.bind(this);
  }
  componentDidMount() {
    this.getPastPrices();
  }

  getPastPrices() {
    axios
      .get(
        `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${this.props.currency}`
      )
      .then(response => {
        let obj = {};
        obj.prices = Object.values(response.data.bpi);
        obj.dates = Object.keys(response.data.bpi);
        return obj;
      })
      .then(response => {
        const node = this.node;

        var myChart = new Chart(node, {
          type: "line",
          data: {
            labels: response.dates,
            datasets: [
              {
                label: "Bitcoin Price",
                data: response.prices,
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
        <canvas
          style={{ width: 800, height: 300 }}
          ref={node => (this.node = node)}
        />
      </div>
    );
  }
}

export default CryptoChart;

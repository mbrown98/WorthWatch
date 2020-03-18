import React from "react";
import axios from "axios";
import runtime from "regenerator-runtime";

export default class OtherCurrencies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BTC: null,
      ETH: null,
      LTC: null,
      XRP: null,
      BCH: null
    };
    this.getOtherCurrencies = this.getOtherCurrencies.bind(this);
  }

  componentDidMount() {
    this.getOtherCurrencies();
    setInterval(this.getOtherCurrencies, 5000);
  }

  async getOtherCurrencies() {
    try {
      console.log("get others run");
      const response = await axios.get(
        "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,XRP,BCH&tsyms=USD,EUR,GBP"
      );
      console.log("response", response);
      this.setState({
        BTC: response.data.BTC.USD,
        ETH: response.data.ETH.USD,
        LTC: response.data.LTC.USD,
        XRP: response.data.XRP.USD,
        BCH: response.data.BCH.USD
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <table class="table">
          <thead>
            <th>Bitcoin</th>
            <th>Ether</th>
            <th>Litecoin</th>
            <th>Ripple XRP</th>
            <th>Bitcoin Cash</th>
          </thead>
          <tbody>
            <td>${this.state.BTC}</td>
            <td>${this.state.ETH}</td>
            <td>${this.state.LTC}</td>
            <td>${this.state.XRP}</td>
            <td>${this.state.BCH}</td>
          </tbody>
        </table>
      </div>
    );
  }
}

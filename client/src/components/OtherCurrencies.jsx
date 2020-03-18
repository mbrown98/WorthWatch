import React from "react";
import axios from "axios";
import runtime from "regenerator-runtime";
import { Thumbnail } from "react-bootstrap";

export default class OtherCurrencies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BTC: [],
      ETH: [],
      LTC: [],
      XRP: [],
      BCH: []
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
        "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,LTC,XRP,BCH&tsyms=USD,EUR,GBP"
      );
      console.log("response", response);

      let bitcoin = response.data.DISPLAY.BTC.USD;
      let bitcoinArr = [];
      bitcoinArr.push(
        bitcoin.PRICE,
        bitcoin.OPENDAY,
        bitcoin.HIGHDAY,
        bitcoin.LOWDAY,
        bitcoin.CHANGEPCTHOUR,
        bitcoin.CHANGEPCTDAY
      );
      let ether = response.data.DISPLAY.ETH.USD;
      let etherArr = [];
      etherArr.push(
        ether.PRICE,
        ether.OPENDAY,
        ether.HIGHDAY,
        ether.LOWDAY,
        ether.CHANGEPCTHOUR,
        ether.CHANGEPCTDAY
      );
      let litecoin = response.data.DISPLAY.LTC.USD;
      let liteArr = [];
      liteArr.push(
        litecoin.PRICE,
        litecoin.OPENDAY,
        litecoin.HIGHDAY,
        litecoin.LOWDAY,
        litecoin.CHANGEPCTHOUR,
        litecoin.CHANGEPCTDAY
      );
      let ripple = response.data.DISPLAY.XRP.USD;
      let rippleArr = [];
      rippleArr.push(
        ripple.PRICE,
        ripple.OPENDAY,
        ripple.HIGHDAY,
        ripple.LOWDAY,
        ripple.CHANGEPCTHOUR,
        ripple.CHANGEPCTDAY
      );
      let cash = response.data.DISPLAY.BCH.USD;
      let cashArr = [];
      cashArr.push(
        cash.PRICE,
        cash.OPENDAY,
        cash.HIGHDAY,
        cash.LOWDAY,
        cash.CHANGEPCTHOUR,
        cash.CHANGEPCTDAY
      );
      this.setState({
        BTC: bitcoinArr,
        ETH: etherArr,
        LTC: liteArr,
        XRP: rippleArr,
        BCH: cashArr
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
            <th></th>
            <th>Price</th>
            <th>Open Day</th>
            <th>High Day</th>
            <th>Low Day</th>
            <th>Change Hour</th>
            <th>Change Day</th>
          </thead>
          <tbody>
            <tr>
              <th>Bitcoin</th>
              <td>{this.state.BTC[0]}</td>
              <td>{this.state.BTC[1]}</td>
              <td>{this.state.BTC[2]}</td>
              <td>{this.state.BTC[3]}</td>
              <td>{this.state.BTC[4]}%</td>
              <td>{this.state.BTC[5]}%</td>
            </tr>
            <tr>
              <th>Ether</th>
              <td>{this.state.ETH[0]}</td>
              <td>{this.state.ETH[1]}</td>
              <td>{this.state.ETH[2]}</td>
              <td>{this.state.ETH[3]}</td>
              <td>{this.state.ETH[4]}%</td>
              <td>{this.state.ETH[5]}%</td>
            </tr>
            <tr>
              <th>Litecoin</th>
              <td>{this.state.LTC[0]}</td>
              <td>{this.state.LTC[1]}</td>
              <td>{this.state.LTC[2]}</td>
              <td>{this.state.LTC[3]}</td>
              <td>{this.state.LTC[4]}%</td>
              <td>{this.state.LTC[5]}%</td>
            </tr>
            <tr>
              <th>Ripple XRP</th>
              <td>{this.state.XRP[0]}</td>
              <td>{this.state.XRP[1]}</td>
              <td>{this.state.XRP[2]}</td>
              <td>{this.state.XRP[3]}</td>
              <td>{this.state.XRP[4]}%</td>
              <td>{this.state.XRP[5]}%</td>
            </tr>
            <tr>
              <th>Bitcoin Cash</th>
              <td>{this.state.BCH[0]}</td>
              <td>{this.state.BCH[1]}</td>
              <td>{this.state.BCH[2]}</td>
              <td>{this.state.BCH[3]}</td>
              <td>{this.state.BCH[4]}%</td>
              <td>{this.state.BCH[5]}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

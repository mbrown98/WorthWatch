import React from "react";
import axios from "axios";

export default class OtherCurrencies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BTC: [],
      ETH: [],
      LTC: [],
      XRP: [],
      BCH: [],
      currentCurrency: "USD"
    };
    this.getOtherCurrencies = this.getOtherCurrencies.bind(this);
  }

  componentDidMount() {
    this.getOtherCurrencies();
    // setInterval(this.getOtherCurrencies, 1000);
  }

  setCurrency(val) {
    this.setState({ currentCurrency: val }, () => this.getOtherCurrencies());
  }

  async getOtherCurrencies() {
    let val = this.state.currentCurrency;
    try {
      const response = await axios.get(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,LTC,XRP,BCH&tsyms=${val}`
      );
      console.log("response", response);

      let bitcoin = response.data.DISPLAY.BTC[val];
      let bitcoinArr = [];
      bitcoinArr.push(
        bitcoin.PRICE,
        bitcoin.OPENDAY,
        bitcoin.HIGHDAY,
        bitcoin.LOWDAY,
        bitcoin.CHANGEPCTHOUR,
        bitcoin.CHANGEPCTDAY
      );
      let ether = response.data.DISPLAY.ETH[val];
      let etherArr = [];
      etherArr.push(
        ether.PRICE,
        ether.OPENDAY,
        ether.HIGHDAY,
        ether.LOWDAY,
        ether.CHANGEPCTHOUR,
        ether.CHANGEPCTDAY
      );
      let litecoin = response.data.DISPLAY.LTC[val];
      let liteArr = [];
      liteArr.push(
        litecoin.PRICE,
        litecoin.OPENDAY,
        litecoin.HIGHDAY,
        litecoin.LOWDAY,
        litecoin.CHANGEPCTHOUR,
        litecoin.CHANGEPCTDAY
      );
      let ripple = response.data.DISPLAY.XRP[val];
      let rippleArr = [];
      rippleArr.push(
        ripple.PRICE,
        ripple.OPENDAY,
        ripple.HIGHDAY,
        ripple.LOWDAY,
        ripple.CHANGEPCTHOUR,
        ripple.CHANGEPCTDAY
      );
      let cash = response.data.DISPLAY.BCH[val];
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
        <div className="field is-grouped">
          <a
            className="button is-danger"
            onClick={() => {
              this.setCurrency("USD");
            }}
          >
            US Dollar
          </a>
          <a
            className="button is-link"
            onClick={() => {
              this.setCurrency("GBP");
            }}
          >
            British Pound
          </a>
          <a
            className="button is-primary"
            onClick={() => {
              this.setCurrency("EUR");
            }}
          >
            Euro
          </a>
          <a
            className="button is-success"
            onClick={() => {
              this.setCurrency("JPY");
            }}
          >
            Japanese Yen
          </a>
          <a
            className="button is-warning"
            onClick={() => {
              this.setCurrency("CNY");
            }}
          >
            Chinese Yuan
          </a>
          <a
            className="button is-danger"
            onClick={() => {
              this.setCurrency("INR");
            }}
          >
            Indian Rupee
          </a>
        </div>
        <div>
          <table class="table has-text-left">
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
      </div>
    );
  }
}

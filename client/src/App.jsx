import React from "react";
import axios from "axios";
import Chart from "./components/Chart.jsx";
import CurrentPrice from "./components/CurrentPrice.jsx";
import CurrencySelect from "./components/CurrencySelect.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      USD: null,
      GBP: null,
      EUR: null,
      currentCurrency: "USD"
    };
    this.getCurrentPrices = this.getCurrentPrices.bind(this);
    this.setCurrency = this.setCurrency.bind(this);
  }
  componentDidMount() {
    this.getCurrentPrices();
  }

  getCurrentPrices() {
    axios.get("/crypto/currentPrices").then(response => {
      this.setState({ USD: response.data.bpi.USD.rate_float });
      this.setState({ GBP: response.data.bpi.GBP.rate_float });
      this.setState({ EUR: response.data.bpi.EUR.rate_float });
    });
  }

  setCurrency(val) {
    this.setState({ currentCurrency: val });
  }

  render() {
    return (
      <div>
        <h1>CryptoTracker</h1>
        <CurrencySelect setCurrency={this.setCurrency} />
        <CurrentPrice
          USD={this.state.USD}
          GBP={this.state.GBP}
          EUR={this.state.EUR}
          currency={this.state.currentCurrency}
        />
        <Chart currency={this.state.currentCurrency} />
        <h5>Powered by CoinDesk</h5>
      </div>
    );
  }
}

export default App;

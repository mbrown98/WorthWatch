import React from "react";
import axios from "axios";
import Chart from "./components/Chart.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPrice: null
    };
    this.getCurrentPrices = this.getCurrentPrices.bind(this);
  }
  componentDidMount() {
    this.getCurrentPrices;
  }

  getCurrentPrices() {
    axios.get("/crypto/currentPrices").then(response => {
      console.log(response.data);
      this.setState({ currentPrice: response.data });
    });
  }

  render() {
    return (
      <div>
        <h1>CryptoTracker</h1>
        <Chart />
      </div>
    );
  }
}

export default App;

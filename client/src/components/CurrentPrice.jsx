import React from "react";
import axios from "axios";

export default class CurrentPrice extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.currency === "USD" && (
          <h1>Current Price: ${this.props.USD}</h1>
        )}
        {this.props.currency === "GBP" && (
          <h1>Current Price: £{this.props.GBP}</h1>
        )}
        {this.props.currency === "EUR" && (
          <h1>Current Price: €{this.props.EUR}</h1>
        )}
      </div>
    );
  }
}

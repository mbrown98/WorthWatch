import React from "react";
import axios from "axios";

export default class CurrencySelect extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="buttons">
        <a
          className="button is-dark"
          onClick={() => {
            this.props.setCurrency("USD");
          }}
        >
          USD
        </a>
        <a
          className="button is-dark"
          onClick={() => {
            this.props.setCurrency("GBP");
          }}
        >
          GBP
        </a>
        <a
          className="button is-dark"
          onClick={() => {
            this.props.setCurrency("EUR");
          }}
        >
          EUR
        </a>
      </div>
    );
  }
}

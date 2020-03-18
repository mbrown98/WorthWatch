import React from "react";
import axios from "axios";

export default class CurrencySelect extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="field is-grouped">
        <a
          className="button is-danger"
          onClick={() => {
            this.props.setCurrency("USD");
          }}
        >
          US Dollar
        </a>
        <a
          className="button is-link"
          onClick={() => {
            this.props.setCurrency("GBP");
          }}
        >
          British Pound
        </a>
        <a
          className="button is-primary"
          onClick={() => {
            this.props.setCurrency("EUR");
          }}
        >
          Euro
        </a>
        <a
          className="button is-success"
          onClick={() => {
            this.props.setCurrency("JPY");
          }}
        >
          Japanese Yen
        </a>
        <a
          className="button is-warning"
          onClick={() => {
            this.props.setCurrency("CNY");
          }}
        >
          Chinese Yuan
        </a>
        <a
          className="button is-danger"
          onClick={() => {
            this.props.setCurrency("INR");
          }}
        >
          Indian Rupee
        </a>
      </div>
    );
  }
}

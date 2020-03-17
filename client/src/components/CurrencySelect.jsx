import React from "react";
import axios from "axios";
import { ButtonGroup, Button } from "react-bootstrap";

export default class CurrencySelect extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="secondary"
            onClick={() => {
              this.props.setCurrency("USD");
            }}
          >
            USD
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              this.props.setCurrency("GBP");
            }}
          >
            GBP
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              this.props.setCurrency("EUR");
            }}
          >
            EUR
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

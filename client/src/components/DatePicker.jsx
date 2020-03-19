import React from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import Moment from "moment";

export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      selectedCurrency: null,
      submitted: true,
      currencyOptions: [
        { name: "Select", symbol: "" },
        {
          name: "Bitcoin",
          symbol: "BTC"
        },
        {
          name: "Ether",
          symbol: "ETH"
        },
        {
          name: "Litecoin",
          symbol: "LTC"
        },
        {
          name: "Ripple XRP",
          symbol: "XRP"
        },
        {
          name: "Bitcoin Cash",
          symbol: "BCH"
        }
      ]
    };
    this.setStart = this.setStart.bind(this);
    this.setEnd = this.setEnd.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
  }

  setStart(date) {
    let startDate = Moment(date).format("YYYY-MM-DD");
    this.setState({ startDate: startDate });
  }

  setEnd(date) {
    let endDate = Moment(date).format("YYYY-MM-DD");
    this.setState({ endDate: endDate });
  }

  changeCurrency() {
    var selectBox = document.getElementById("currencyBox");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    this.setState({ selectedCurrency: selectedValue });
  }

  render() {
    return (
      <div>
        {" "}
        {this.state.submitted ? (
          <div id="calendars">
            <div id="cal1">
              <select id="currencyBox" onChange={this.changeCurrency}>
                {this.state.currencyOptions.map(currency => {
                  return (
                    <option value={currency.symbol}>{currency.name}</option>
                  );
                })}
              </select>
            </div>
            <div id="cal2">
              <h4>Pick Start: {this.state.startDate}</h4>
              <Datetime onChange={this.setStart} value={this.state.date} />
            </div>
            <div id="cal3">
              <h4>Pick End: {this.state.endDate}</h4>
              <Datetime onChange={this.setEnd} value={this.state.date} />
            </div>

            <div id="cal4">
              {" "}
              {this.state.startDate &&
                this.state.endDate &&
                this.state.selectedCurrency && (
                  <button
                    className="button is-success"
                    onClick={() => {
                      this.setState(
                        { submitted: !this.state.submitted },
                        () => {
                          this.props.populateChart(
                            this.state.startDate,
                            this.state.endDate,
                            this.state.selectedCurrency
                          );
                        }
                      );
                    }}
                  >
                    Submit
                  </button>
                )}
            </div>
          </div>
        ) : (
          <button
            className="button is-danger"
            onClick={() => {
              this.setState({
                submitted: !this.state.submitted,
                startDate: null,
                endDate: null,
                selectedCurrency: null
              });
            }}
          >
            New Dates
          </button>
        )}
      </div>
    );
  }
}

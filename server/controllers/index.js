const axios = require("axios");

module.exports = {
  getCurrentPrices: (req, res) => {
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then(response => {
        res.send(response.data);
      });
  }
};

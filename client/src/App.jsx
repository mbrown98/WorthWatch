import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Crypto from "./components/Crypto.jsx";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Stocks from "./components/Stocks";
import Watching from "./components/Watching";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/crypto" component={Crypto} />
            <Route path="/stocks" component={Stocks} />
            <Route path="/watching" component={Watching} />
          </Switch>
        </div>
      </BrowserRouter>

      //   <BrowserRouter>
      //     <div>
      //       <Navigation />
      //       <Switch>
      //         <Route path="/" component={Home} exact />
      //         <Route path="/about" component={About} />
      //         <Route path="/contact" component={Contact} />
      //         <Route component={Error} />
      //       </Switch>
      //     </div>
      //   </BrowserRouter>
    );
  }
}

export default App;

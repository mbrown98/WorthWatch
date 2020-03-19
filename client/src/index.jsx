import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";

import App from "./App";

ReactDOM.render(<App />, document.getElementById("app"));

// ReactDOM.render((
//     <Router>
//         <Route path="/" component={App}>
//             <Route path="api/animals" component={Animals}>
//                <Route path="birds" component={Birds}/>
//                <Route path="cats" component={Cats}/>
//             </Route>
//         </Route>
//         <Route path="api/search:term" component={AnimalSearchBox}>
//     </Router>
// ), document.body)

import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section class="hero is-link is-fullheight">
        <div class="hero-head">
          <nav class="navbar">
            <div class="container">
              <div class="navbar-brand">
                <a class="navbar-item"></a>
                <span
                  class="navbar-burger burger"
                  data-target="navbarMenuHeroA"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
              <div id="navbarMenuHeroA" class="navbar-menu">
                <div class="navbar-end">
                  <Link to="/" class="navbar-item is-active">
                    Home
                  </Link>
                  <Link to="/crypto" class="navbar-item is-active">
                    CyrptoWatch
                  </Link>
                  <Link to="/stocks" class="navbar-item is-active">
                    StockWatch
                  </Link>
                  <Link to="/watching" class="navbar-item is-active">
                    Watching
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div class="hero-body">
          <div class="container has-text-centered">
            <h1 class="title" id="homeTitle">
              WorthWatch
            </h1>
            <h2 class="subtitle">Follow the Money</h2>
          </div>
        </div>

        <div class="hero-foot">
          <nav class="tabs">
            <div class="container">
              <ul>
                <li class="is-active">
                  <a>Home</a>
                </li>
                <li>
                  <a>CyrptoTracker</a>
                </li>
                <li>
                  <a>StockTracker</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </section>
    );
  }
}

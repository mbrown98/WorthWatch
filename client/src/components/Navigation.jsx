import React from "react";

import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div id="navBar">
      <NavLink class="navPiece" to="/">
        Home
      </NavLink>
      <NavLink class="navPiece" to="/crypto">
        Crypto
      </NavLink>
      <NavLink class="navPiece" to="/stocks">
        Stocks
      </NavLink>
      <NavLink class="navPiece" to="/watching">
        Watching
      </NavLink>

      {/* <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink> */}
    </div>
  );
};

export default Navigation;

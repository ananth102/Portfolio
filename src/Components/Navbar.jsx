import React, { Component } from "react";
import "../navbar.css";
import "bootstrap/dist/css/bootstrap.css";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0">Navbar</span>
      </nav>
    );
  }
}

export default Navbar;

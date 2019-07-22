import React, { Component } from "react";
import "../navbar.css";
import "bootstrap/dist/css/bootstrap.css";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0">
          My Portfolio ${this.props.value}
        </span>

        <button onClick={this.props.onClick} className="btn btn-info">
          Refresh
        </button>
      </nav>
    );
  }
}

export default Navbar;

import React, { Component } from "react";
import "./App.css";
import Searchbar from "./Components/searchbar";

import Navbar from "./Components/Navbar";

class App extends Component {
  state = {};
  //<Searchbar />
  render() {
    return (
      <div>
        <Navbar />
        <Searchbar />
      </div>
    );
  }
  handleDelete() {}
}

export default App;

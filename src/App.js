import React, { Component } from "react";
import "./App.css";
import Searchbar from "./Components/searchbar";

import "google-stocks";
import googleStocks from "google-stocks/dist/google-stocks";
import { lookup, history } from "yahoo-stocks";

import "./Components/cards";
import Navbar from "./Components/Navbar";
import { Script } from "vm";
import Cards from "./Components/cards";

class App extends Component {
  state = {
    text: "",
    stocks: []
  };

  handleChange = e => {
    //console.log("dd");
    let value = e.target.value;
    this.setState({ text: value });
  };

  //<Searchbar />
  render() {
    return (
      <div>
        <Navbar meow={0} />
        <Searchbar onClick={this.handleClick} onChange={this.handleChange} />
        <Cards stocks={this.state.stocks} />
      </div>
    );
  }
  delete() {}
  init() {}

  handleClick = () => {
    console.log(this.state.text);
    let re = null;
    lookup(this.state.text).then(response => {
      console.log("sent");
      console.log(response);
      re = response;
      let stocks = [...this.state.stocks];
      stocks.push({ id: re.name, currentPrice: re.currentPrice });
      this.setState({ stocks });
      console.log(this.state);
    });
  };
}

export default App;

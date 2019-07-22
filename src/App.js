import React, { Component } from "react";
import "./App.css";
import Searchbar from "./Components/searchbar";

import { lookup, history } from "yahoo-stocks";

import "./Components/cards";
import Navbar from "./Components/Navbar";
import { Script } from "vm";
import Cards from "./Components/cards";

import * as cl from "clearbit-logo";

/*
FIX HANDLE CHANGE THIS ISNT WORKABLE ASAP
Make an array based function
*/

class App extends Component {
  state = {
    text: "",
    stocks: [],
    totalValue: 0,
    stockText: ""
  };

  handleChange = e => {
    //console.log("dd");
    let value = e.target.value;
    this.setState({ text: value });
  };
  handleChangeForStockText = e => {
    let value = e.target.value;
    this.setState({ stockText: value });
  };

  //<Searchbar />
  render() {
    let woof = new cl();
    console.log();
    woof.image("apple.com").then(imageURL => {
      console.log(imageURL);
    });
    //cl.getLogo("apple.com");
    return (
      <div>
        <Navbar value={this.state.totalValue} onClick={this.navbarClick} />
        <Searchbar onClick={this.handleClick} onChange={this.handleChange} />
        <Cards
          stocks={this.state.stocks}
          delete={this.delete}
          onChange={this.handleChangeForStockText}
          init={this.init}
        />
      </div>
    );
  }
  navbarClick = () => {
    let stocks = [...this.state.stocks];
    stocks = stocks.map(stock => {
      lookup(stock.symbol).then(response => {
        stock.value = stock.sharesOwned * response.currentPrice;
        console.log("changed");
      });
      return stock;
    });
    this.setState({ stocks });
  };

  delete = stockId => {
    console.log("Deleted", stockId, this.state.stocks);

    //Deletes stock from array -- done
    //Decrements value from navbar
    let totalValue = this.state.totalValue - this.state.stocks[stockId].value;
    const stocke = this.state.stocks.filter(c => c.id !== stockId);
    const stocks = stocke.map(stock => {
      if (stock.id > stockId) {
        stock.id = stock.id - 1;
      }
      return stock;
    });
    // console.log("done with map", stocks);
    this.setState({ totalValue });
    this.setState({ stocks });
    // console.log("after", this.state.stocks);
  };
  init = stockId => {
    //Initiates stock and adds to array - done
    //converts state of card - done
    //adds to navbar
    const stocks = [...this.state.stocks];
    stocks[stockId].status = false;
    stocks[stockId].value =
      parseFloat(this.state.stockText) * stocks[stockId].currentPrice;
    //console.log(stocks[stockId].value);
    stocks[stockId].sharesOwned = parseFloat(this.state.stockText);
    this.setState({ stocks });
    let totalValue = this.state.totalValue;
    totalValue += stocks[stockId].value;

    this.setState({ totalValue });

    // console.log("id", this.state.stocks[stockId].status);
  };

  handleClick = () => {
    console.log(this.state.text);
    let re = null; // needed not random
    lookup(this.state.text).then(response => {
      //console.log("sent");
      console.log(response);
      re = response;
      let stocks = [...this.state.stocks];
      stocks.push({
        name: re.name,
        currentPrice: re.currentPrice,
        id: stocks.length,
        status: true,
        value: 0,
        symbol: re.symbol,
        sharesOwned: 0
      });
      this.setState({ stocks });
      //console.log(this.state);
    });
  };
}

export default App;

import React, { Component } from "react";
import "./App.css";
import Searchbar from "./Components/searchbar";

import { lookup, history } from "yahoo-stocks";

import "./Components/cards";
import Navbar from "./Components/Navbar";
import { Script } from "vm";
import Cards from "./Components/cards";
import * as cl from "clearbit-logo";
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/database";

/*
FIX HANDLE CHANGE THIS ISNT WORKABLE ASAP
Make an array based function

CHANGE FIREBASE FUNCTION TO USER
*/
let app;
class App extends Component {
  state = {
    text: "",
    stocks: [],
    totalValue: 0,
    stockText: "",
    firebasekey: {
      apiKey: "AIzaSyCP6jCJss6UtTtUBL9fof3375Tg9ZIPV5k",
      authDomain: "stock-portfolio-135dc.firebaseapp.com",
      databaseURL: "https://stock-portfolio-135dc.firebaseio.com",
      projectId: "stock-portfolio-135dc",
      storageBucket: "",
      messagingSenderId: "889470241430",
      appId: "1:889470241430:web:635e00fb02026d9b"
    },
    userId: "",
    app: null,
    sent: false,
    app: null
  };
  app = firebase.initializeApp(this.state.firebasekey);

  handleChange = e => {
    //console.log("dd");
    let value = e.target.value;
    this.setState({ text: value });
  };
  handleChangeForStockText = e => {
    let value = e.target.value;
    this.setState({ stockText: value });
  };
  handleChangeForUserId = e => {
    let value = e.target.value;
    this.setState({ userId: value });
  };

  //<Searchbar />
  render() {
    //cl.getLogo("apple.com");
    // let app = firebase.initializeApp(this.state.firebasekey);
    // let database = firebase.database();

    // database.ref("test/").set({
    //   stock: "woof"
    // });
    //console.log(this.state.stocks.length);
    return (
      <div>
        <Navbar value={this.state.totalValue} onClick={this.navbarClick} />
        <Searchbar
          onClick={this.handleClick}
          onChange={this.handleChange}
          userId={this.state.userId}
          getUser={this.getInitialStocks}
          userChange={this.handleChangeForUserId}
          sent={this.state.sent}
        />
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
        console.log(stock.value);
      });
      return stock;
    });
    //let prev = 0;
    let stockNums = stocks.map(stock => {
      return stock.value;
    });
    let totalValue = stockNums.reduce((prev, curr) => {
      return prev + curr;
    });
    console.log("ttl", totalValue);
    this.setState({ totalValue });
    this.setState({ stocks });
  };

  /**Delete card */
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
    let database = firebase.database();
    database.ref("test/" + this.state.userId).update({
      stock: this.state.stocks
    });
    // console.log("after", this.state.stocks);
  };

  /**Initiate a card */
  init = stockId => {
    //Initiates stock and adds to array - done
    //converts state of card - done
    //adds to navbar
    //pushes to firebase
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

    // let app = firebase.initializeApp(this.state.firebasekey);
    let database = firebase.database();

    database.ref("test/" + this.state.userId).update({
      stock: this.state.stocks
    });

    // console.log("id", this.state.stocks[stockId].status);
  };

  /**Retrives stock */
  handleClick = () => {
    console.log(this.state.text);
    let re = null; // needed not random
    lookup(this.state.text).then(response => {
      //console.log("sent");
      console.log(response);
      re = response;
      let stocks = [...this.state.stocks];
      let str = re.name.replace(/ .*/, "").toLowerCase();
      let woof = new cl();
      let url;
      //console.log(str + ".com");
      woof.image(str + ".com", 50).then(imageURL => {
        // console.log(imageURL);
        //stocks[stockId].url = imageURL;
        stocks.push({
          name: re.name,
          currentPrice: re.currentPrice,
          id: stocks.length,
          status: true,
          value: 0,
          symbol: re.symbol,
          sharesOwned: 0,
          url: { imageURL }
        });
        this.setState({ stocks });
      });

      //console.log(this.state);
    });
  };

  getInitialStocks = () => {
    console.log("id", this.state.userId);
    if (this.state.sent === false) {
      //  let app = firebase.initializeApp(this.state.firebasekey);
      this.setState({ app });
    }
    let database = firebase.database();
    let stocks;
    //sleep(1000);
    database
      .ref("test/" + this.state.userId)
      .once("value")
      .then(snapshot => {
        if (snapshot.val() !== null) {
          stocks = snapshot.val().stock;
          console.log(stocks);

          if (stocks !== null) {
            console.log("updated");
            this.setState({ stocks });
            console.log(this.state.stocks.stock);
          } else {
            this.createNewId(database);
          }
        }
      });
    let sent = true;
    this.setState({ sent });
  };

  createNewId = database => {
    database.ref("test/" + this.state.userId).set({
      stocks: null
    });
  };
}

export default App;

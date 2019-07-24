import React, { Component } from "react";
import "./card";
import Card from "./card";

class cards extends Component {
  state = {
    //array
  };
  render() {
    return (
      <div class="container">
        <div class="row">{this.setNumberCards()}</div>
      </div>
    );
  }
  setNumberCards() {
    let cardsN = [];
    //console.log("stock len", this.props.stocks.length);
    for (let c = 0; c < this.props.stocks.length; c++) {
      cardsN.push(
        <Card
          key={c}
          id={c}
          Card={Card}
          onChange={this.props.onChange}
          value={this.props.value}
          name={this.props.stocks[c].name}
          status={this.props.stocks[c].status}
          delete={this.props.delete}
          init={this.props.init}
          url={this.props.stocks[c].url}
        />
      );
    }
    return cardsN;
  }
  getImage = () => {};
}

export default cards;

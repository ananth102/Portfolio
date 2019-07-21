import React, { Component } from "react";
import "./card";
import Card from "./card";

class cards extends Component {
  state = {
    //array
  };
  render() {
    this.getImage();
    return (
      <div class="container">
        <div class="row">{this.setNumberCards()}</div>
      </div>
    );
  }
  setNumberCards() {
    let cardsN = [];
    for (let c = 0; c < this.props.stocks.length; c++) {
      cardsN.push(
        <Card key={c} name={this.props.stocks[c].id} status={true} />
      );
    }
    return cardsN;
  }
  getImage = () => {};
}

export default cards;

import React, { Component } from "react";
import "../cards.css";
import "../input.css";
import Apple from "../Apple.jpg";

class card extends Component {
  render() {
    //console.log("called", this.props.status);
    console.log(this.props.url.imageURL);
    //console.log(url);
    return (
      <div class="card">
        <img
          class="card-img-top"
          src={this.props.url.imageURL}
          alt="Card image cap"
        />
        <div class="card-body">
          <h5 class="card-title">{this.props.name}</h5>
          <p class="card-text">Enter Amount of shares owned</p>
          {this.cardTextBox()}
          {this.cardButton()}
        </div>
      </div>
    );
  }
  cardTextBox() {
    if (this.props.status)
      return (
        <input
          type="text"
          onChange={this.props.onChange}
          class="form-control"
        />
      );
  }
  cardButton() {
    if (this.props.status) {
      return (
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => this.props.init(this.props.id)}
        >
          Initialize Stock
        </button>
      );
    } else {
      return (
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => this.props.delete(this.props.id)}
        >
          Delete Stock
        </button>
      );
    }
  }
}

export default card;

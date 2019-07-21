import React, { Component } from "react";
import "../cards.css";
import "../input.css";
import Apple from "../Apple.jpg";
class card extends Component {
  render() {
    return (
      <div class="card">
        <img class="card-img-top" src={Apple} alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">{this.props.name}</h5>
          <p class="card-text">Value: Growth 24 Hr Performance</p>
          {this.cardTextBox()}
          {this.cardButton()}
        </div>
      </div>
    );
  }
  cardTextBox() {
    if (this.props.status) return <input type="text" class="form-control" />;
  }
  cardButton() {
    if (this.props.status) {
      return (
        <button type="button" class="btn btn-primary" onClick={this.props.init}>
          Initialize Stock
        </button>
      );
    } else {
      return (
        <button
          type="button"
          class="btn btn-primary"
          onClick={this.props.delete}
        >
          Delete Stock
        </button>
      );
    }
  }
}

export default card;

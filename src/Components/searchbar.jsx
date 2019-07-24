import React, { Component } from "react";
import "../input.css";
//import "google-stocks";
//import googleStocks from "google-stocks/dist/google-stocks";
import { lookup, history } from "yahoo-stocks";

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //text: ""
    };
  }

  render() {
    //console.log(this.state);

    return (
      <div>
        {this.renderUserId()}
        <React.Fragment>
          <input
            type="text"
            onChange={this.props.onChange}
            name="name"
            class="question"
            id="nme"
            required
            autocomplete="off"
          />
          <label for="nme">
            <span>Enter Stock or Crypto currency</span>
          </label>
          <button
            onClick={this.props.onClick}
            class="btn btn-outline-secondary"
          >
            Add
          </button>
        </React.Fragment>
      </div>
    );
  }
  /*
  handleClick = () => {
    console.log(this.state.text);

    lookup(this.state.text).then(response => {
      /**Enable Big-C extention 
      console.log("sent");
      console.log(response.currentPrice);
    });
  };
  handleChange = e => {
    let value = e.target.value;
    this.setState({ text: value });
  };
  */
  renderUserId = () => {
    console.log(this.props.sent);
    if (this.props.sent === false) {
      return (
        <React.Fragment>
          <input
            type="text"
            //onChange={this.props.onChange}
            name="name"
            class="question"
            id="nme"
            required
            autocomplete="off"
            onChange={this.props.userChange}
          />
          <label for="nme">
            <span>Enter User Id</span>
          </label>
          <button
            onClick={this.props.getUser}
            class="btn btn-outline-secondary"
          >
            Add
          </button>
        </React.Fragment>
      );
      this.props.userId = "woof";
    }
  };
}

export default Searchbar;

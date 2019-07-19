import React, { Component } from "react";
import "../input.css";
//import { lookup, history } from "yahoo-stocks";
import { lookup, history } from "yahoo-stocks";
class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  render() {
    //console.log(this.state);
    return (
      <React.Fragment>
        <input
          type="text"
          onChange={this.handleChange}
          name="name"
          class="question"
          id="nme"
          required
          autocomplete="off"
        />
        <label for="nme">
          <span>Enter Stock or Crypto currency</span>
        </label>
        <button onClick={this.handleClick} class="btn btn-outline-secondary">
          Add
        </button>
      </React.Fragment>
    );
  }
  handleClick = () => {
    console.log(this.state.text);
    lookup(this.state.text).then(response => {
      console.log(response);
    });
  };
  handleChange = e => {
    let value = e.target.value;
    this.setState({ text: value });
  };
}

export default Searchbar;

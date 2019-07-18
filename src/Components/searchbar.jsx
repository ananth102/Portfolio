import React, { Component } from "react";
import "../input.css";
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
    console.log("searching for ", this.state.text);
  };
  handleChange = e => {
    let value = e.target.value;
    this.setState({ text: value });
  };
}

export default Searchbar;

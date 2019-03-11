import React, { Component } from "react";
import norkartlogo from "../images/Norkartlogo.PNG";

class Header extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="header">
        {" "}
        <img src={norkartlogo} alt="logo" id="norkartlogo" />
      </div>
    );
  }
}
export default Header;

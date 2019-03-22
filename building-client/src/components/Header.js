import React, { Component } from "react";
import norkartlogo from "../images/Norkartlogo.PNG";

class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="header">
          <img src={norkartlogo} alt="logo" id="norkartlogo" />
        </div>
      </React.Fragment>
    );
  }
}
export default Header;

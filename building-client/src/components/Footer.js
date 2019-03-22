import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <footer className="footer">
          <details>
            <summary>2019&copy;Norkart</summary>
            <p>This client is a product of Norkart</p>
            <p>
              The purpose of the product is to show how to integrate with
              Norkart Apis
            </p>
          </details>
        </footer>
      </React.Fragment>
    );
  }
}
export default Footer;

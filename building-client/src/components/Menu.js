import React, { Component } from "react";

import { AppContext } from "./ContentWrapper";
class Menu extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {({ state, setRenderComponent }) => {
          return (
            state.isValidKey && (
              <div>
                <button className={'pure-material-button-contained'} onClick={() => setRenderComponent("position")}>
                  position
                </button>
                <button className={'pure-material-button-contained'} onClick={() => setRenderComponent("geometry")}>
                  geometry
                </button>
              </div>
            )
          );
        }}
      </AppContext.Consumer>
    );
  }
}
export default Menu;

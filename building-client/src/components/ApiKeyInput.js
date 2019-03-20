import React, { Component } from "react";
import { AppContext } from "./ContentWrapper";

class ApiKeyInput extends Component {
  onChange(e, setApiKey) {
    let key = e.target.value;
    setApiKey(key);
  }

  render() {
    return (
      <AppContext.Consumer>
        {({ state, setApiKey }) => {
          return (
            <div>
              {/*<label htmlFor="apiKeyInput" className={'Input-label'}>ApiKey:</label>*/}
              <div className="Input">
                <input
                  value={state.apiKey ? state.apiKey : ""}
                  name="apiKeyInput"
                  id="input"
                  className={"Input-text"}
                  type="text"
                  placeholder="Enter key..."
                  onChange={e => this.onChange(e, setApiKey)}
                />
              </div>
            </div>
          );
        }}
      </AppContext.Consumer>
    );
  }
}
export default ApiKeyInput;

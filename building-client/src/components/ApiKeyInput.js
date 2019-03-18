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
            <label htmlFor="apiKeyInput">ApiKey:</label>
            <input
            value={state.apiKey ? state.apiKey : ''}
              name="apiKeyInput"
              type="text"
              placeholder="Enter key..."
              onChange={e => this.onChange(e, setApiKey)}
            />
          </div>
        )}}
      </AppContext.Consumer>
    );
  }
}
export default ApiKeyInput;

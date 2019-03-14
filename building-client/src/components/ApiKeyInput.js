import React, { Component } from "react";
import { AppContext } from "./ContentWrapper";

class ApiKeyInput extends Component {
  constructor() {
    super();
    /*  this.state={
      apiKey:null
    };
    this.setKeyState= this.setKeyState.bind(this); */
  }

  onChange(e, setApiKey) {
    let key = e.target.value;
      setApiKey(key);
  }

  /*async setKeyState(key){
    this.setState({ApiKey:key});
  } */
  render() {
    return (
      <AppContext.Consumer>
        {({ state, setApiKey }) => { 
          return (
          
          <div>
            <label htmlFor="apiKeyInput">ApiKey:</label>
            <input
            value={state.apiKey ? state.apiKey : undefined}
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

import React, { Component } from "react";

export const AppContext = React.createContext();

class ContentWrapper extends Component {
  constructor() {
    super();
    this.state = {
      isValidKey: false,
      apiKey: null,
      feedback: null, 
      renderComponentName:'position'
    };
    this.setApiKey = this.setApiKey.bind(this);
    this.setFeedback = this.setFeedback.bind(this);
    this.setRenderComponent = this.setRenderComponent.bind(this);

  }
  componentDidMount() {
    let key = sessionStorage.getItem("apiKey");
    if (key) {
      this.setApiKey(key);
    }
  }
  setApiKey(key) {
    let isValid = this.isValidKey(key);
    sessionStorage.setItem("apiKey", key);
    this.setState({
      isValidKey: isValid,
      apiKey: key
    });
  }
  setFeedback(message) {
    this.setState({
      feedback: message
    });
  }
  setRenderComponent(componentName) {
    this.setState({
      renderComponentName: componentName
    });
  }

  isValidKey(key) {
    if (key && key.length > 5) return true;
    return false;
  }

  render() {
    const { children } = this.props;

    return (
      <AppContext.Provider
        value={{
          state: this.state,
          setApiKey: this.setApiKey,
          setFeedback: this.setFeedback,
          setRenderComponent: this.setRenderComponent
        }}
      >
        <div className="contentWrapper">{children}</div>
      </AppContext.Provider>
    );
  }
}
export default ContentWrapper;

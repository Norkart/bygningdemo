import React, { Component } from "react";



export const AppContext = React.createContext();
class ContentWrapper extends Component {
  constructor() {
    super();
    this.state ={
        isValidKey:false,
        apiKey:null
    }
    this.setApiKey = this.setApiKey.bind(this);

  }
  componentDidMount(){
    let key = sessionStorage.getItem('apiKey');
    if(key){
        this.setApiKey(key);
    }
  }
  setApiKey(key){
    let isValid= this.isValidKey(key);
        sessionStorage.setItem('apiKey', key);
        this.setState({
            isValidKey:isValid,
            apiKey:key});
        }


  isValidKey(key){
      if(key && key.length >5)
        return true;
    return false;
  }
  
  render() {
    const { children } = this.props;

    return (
      <AppContext.Provider value={{
        state: this.state,
        setApiKey: this.setApiKey,
      }}>
        <div className="contentWrapper">{children}</div>
      </AppContext.Provider>
    );
  }
}
export default ContentWrapper;

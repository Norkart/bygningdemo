import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FeatureComponent from './FeatureComponent';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
          <FeatureComponent name="Iechha"/>
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
          </a>
        </header>
        
      </div>
    );
  }
}

export default App;

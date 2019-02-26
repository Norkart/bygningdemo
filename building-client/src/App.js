import React, { Component } from 'react';
import ContentWrapper from './components/ContentWrapper';
import MainContent from './components/MainContent';
import './App.css';
import FeatureComponent from './FeatureComponent';
class App extends Component {
  render() {
    return (
      <div className="App">
       <ContentWrapper>
       <MainContent></MainContent>
       </ContentWrapper>
      </div>
    );
  }
}

export default App;

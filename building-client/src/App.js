import React, { Component } from 'react';
import ContentWrapper from './components/ContentWrapper';
import MainContent from './components/MainContent';
import './App.css';
import FeatureComponent from './FeatureComponent';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
class App extends Component {
  render() {
    return (
      <div className="App">
       <ContentWrapper>
       <Header></Header>   
       <Sidebar></Sidebar>
       <MainContent oneProp={{name:'myProp'}} searchboxLabel="Søk på gateadresse:" ></MainContent>
       <Footer></Footer>
       </ContentWrapper>
      </div>
    );
  }
}

export default App;

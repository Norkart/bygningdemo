import React, { Component } from "react";
import ContentWrapper from "./components/ContentWrapper";
import MainContent from "./components/MainContent";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
          <ContentWrapper>
            <Header />
            <Sidebar />
            <MainContent
              oneProp={{ name: "myProp" }}
              searchboxLabel="Søk på gateadresse:"
            />
            <Footer />
          </ContentWrapper>
      </div>
    );
  }
}

export default App;

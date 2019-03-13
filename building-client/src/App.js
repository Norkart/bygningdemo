import React, { Component } from "react";
import ContentWrapper from "./components/ContentWrapper";
import MainContent from "./components/MainContent";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { faTrain } from '@fortawesome/free-solid-svg-icons'

library.add(faBuilding);
library.add(faHome);
library.add(faWarehouse);
library.add(faTrain);



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

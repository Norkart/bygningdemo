import React, { Component } from "react";
import ContentWrapper from "./components/ContentWrapper";
import MainContent from "./components/MainContent";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ApiKeyInput from "./components/ApiKeyInput";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBuilding,
  faHome,
  faWarehouse,
  faTrain,
  faLandmark,
  faHotel,
  faBriefcase,
  faClinicMedical,
  faTh,
  faSchool,
  faStoreAlt,
  faStore,
  faHospitalAlt,
  faPlaceOfWorship,
  faMonument
} from "@fortawesome/free-solid-svg-icons";

library.add(faBuilding);
library.add(faHome);
library.add(faWarehouse);
library.add(faTrain);
library.add(faLandmark);
library.add(faHotel);
library.add(faBriefcase);
library.add(faClinicMedical);
library.add(faHospitalAlt);
library.add(faTh);
library.add(faStoreAlt);
library.add(faSchool);
library.add(faStore);
library.add(faMonument);

library.add(faPlaceOfWorship);






class App extends Component {
  render() {
    return (
      <div className="App">
        <ContentWrapper>
          <Header />
          <Sidebar classNames={"sidebarLeft"}>
            <ApiKeyInput />
          </Sidebar>
          <MainContent searchboxLabel="Søk på gateadresse:" />
          <Sidebar classNames={"sidebarRight"} />
          <Footer />
        </ContentWrapper>
      </div>
    );
  }
}

export default App;

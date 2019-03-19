import React, { Component } from "react";
import {getFontIcon} from '../util/helper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class BuildingList extends Component {
  constructor() {
    super();
    this.state = { selectedBuilding: null };
    this.GetDetail = this.GetDetail.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.adressInfo) !==
      JSON.stringify(this.props.adressInfo)
    ) {
      this.setState({ selectedBuilding: null });
    }
  }
  render() {
    const {
      adressInfo,
      rosData,
      buildingName,
      postalCode,
      postalArea,
      adressId
    } = this.props;

    return (
      <div className="buildinglist">
        <h1>AdresseInformasjon</h1>
        <div className="adressInfo">
          <div className="buildingProperties">
            {this.createRow("Adresse", buildingName, "Adresse")}
            {this.createRow("AdressId", adressId, "AdressId")}
            {this.createRow("Postnummer", postalCode, "Postnummer")}
            {this.createRow("Poststed", postalArea, "Poststed")}
            {this.printData(rosData, "RosData")}
            {this.state.selectedBuilding &&
              this.printData(this.state.selectedBuilding, "ByggInfo")}
          </div>
          <div>
            <div className="gridHeaderText">Bygninger</div>
            {this.BuildingTextList(adressInfo)}
          </div>
        </div>
      </div>
    );
  }
  printData(data, header) {
    if (!data) return null;
    let keys = Object.keys(data);
    let html = [];
    html.push(this.createHeaderRow(header));
    for (let index = 0; index < keys.length; index++) {
      const keyValue = keys[index];
      if (data.hasOwnProperty(keyValue)) {
        const element = data[keyValue];
        if (element !== null && typeof element === "object") {
          let subData = this.printData(element, keyValue);
          html.push(...subData);
        } else {
          html.push(this.createRow(keyValue, element, header + index));
        }
      }
    }
    return html;
  }
  createRow(keyValue, value, index) {
    return (
      <React.Fragment key={index}>
        <div className="appBold">
          {keyValue}
          {": "}
        </div>
        <div>{value != null ? JSON.stringify(value) : "Ingen verdi"}</div>
      </React.Fragment>
    );
  }
  createHeaderRow(header) {
    return (
      <React.Fragment key={header}>
        <div className="headerRow gridHeaderText">{header}</div>
      </React.Fragment>
    );
  }

  GetDetail(selectedBuilding) {
    if (selectedBuilding) this.setState({ selectedBuilding: selectedBuilding });
  }

 
  BuildingTextList(building) {
    const listItems = building.Bygninger.map((item, index) => {
      return (
        <li key={index} className="clickable">
          <div onClick={e => this.GetDetail(item)}>
            <FontAwesomeIcon
              icon={getFontIcon(item.MatrikkelData.Bygningstype)}
              size="3x"
            />
            <div>{item.MatrikkelData ? item.MatrikkelData.Bygningstype : ''}</div>
          </div>
        </li>
      );
    });
    return (
      <React.Fragment>
        <div>
          <ul style={{ margin: "0px", padding: "0px" }}>{listItems}</ul>
        </div>
      </React.Fragment>
    );
  }
}
export default BuildingList;

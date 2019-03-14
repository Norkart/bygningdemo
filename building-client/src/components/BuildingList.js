import React, { Component } from "react";
import { serchApiService } from "../util/searchApiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class BuildingList extends Component {
  constructor() {
    super();
    this.state = {selectedBuilding: null };
    this.GetDetail = this.GetDetail.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.building) !== JSON.stringify(this.props.building)
    ) {
      this.setState({ detail: null });
    }
  }
  render() {
    const { adressInfo, rosData, postalCode, postalArea } = this.props;
 
    return (
      <div className="buildinglist">
        <h1>AdresseInformasjon</h1>
        <div className="adressInfo">
          <div className="buildingProperties">
            {this.createRow("Postnummer", postalCode, 'Postnummer')}
            {this.createRow("Poststed", postalArea, "Poststed")}
            {this.printData(rosData, 'RosData')}
            {this.state.selectedBuilding && this.printData(this.state.selectedBuilding, 'ByggInfo')}
          </div>
          <div>{this.BuildingTextList(adressInfo, adressInfo)}</div>
        </div>
      </div>
    );
  }
  printData(data, header) {
    if (!data) return null;
    let keys = Object.keys(data);
    let html = [];

    for (let index = 0; index < keys.length; index++) {
      const keyValue = keys[index];
      if (data.hasOwnProperty(keyValue)) {
        const element = data[keyValue];
        if(element !== null && (typeof element === 'object')){
            let subData = this.printData(element, keyValue);
            html.push(...subData);
        }else{
            html.push(this.createRow(keyValue, element,header+index));
        }        
      }
    }
    return html;
  }
  createRow(keyValue, value, index) {
    return (
      <React.Fragment key={index}>
        <div className="appBold">{keyValue}{": "}</div>
        <div>{value != null ? value : "Ingen verdi"}</div>
      </React.Fragment>
    );
  }

  GetDetail(selectedBuilding) {
    if (selectedBuilding) this.setState({ selectedBuilding: selectedBuilding });
  }

  getFontIcon(bygningstype) {
    console.log(bygningstype);
    switch (bygningstype) {
      case "Enebolig":
        return "home";
      case "Jernbane- og T-banestasjon":
        return "train";
      case "r":
        return "building";
      default:
        return "home";
    }
  }
  BuildingTextList(building, adressInfo) {
    const listItems = building.Bygninger.map((item, index) => {
      return (
        <li key={index} className="clickable">
          <div onClick={e => this.GetDetail(item)}>
            <FontAwesomeIcon
              icon={this.getFontIcon(item.MatrikkelData.Bygningstype)}
            />
            <div>{item.MatrikkelData.Bygningstype}</div>
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

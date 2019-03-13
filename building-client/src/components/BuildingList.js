import React, { Component } from "react";
import { serchApiService } from "../util/searchApiService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class BuildingList extends Component {
  constructor() {
    super();
    this.state = { detail: null };
    this.GetDetail = this.GetDetail.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.building) !== JSON.stringify(this.props.building)
    ) {
      console.log(this.props.building);
      this.setState({ detail: null });
    }
  }
  render() {
      console.log(this.props.rosdata);
    return (
      <div className="buildinglist">
        <h1>Bygningsinformasjon</h1>
        <div
          style={{
            display: "Grid",
            gridTemplateColumns: "500px auto",
            textAlign: "left"
          }}
        >
          <div className="buildingProperties">
            <div className="textstyle">
              Postnummer:{this.props.postnummer && this.props.postnummer}
            </div>
            <div className="textstyle">
              Poststed:{this.props.postalArea && this.props.postalArea}
            </div>
            <div className="textstyle">
              AvstandBrannstasjon:
              {this.props.rosdata && this.props.rosdata.avstandBrannstasjon}
            </div>
            <div className="textstyle">
              Flom:{this.props.rosdata && this.props.rosdata.flom}
            </div>
            <div className="textstyle">
              Fredabygg:{this.props.rosdata && JSON.stringify(this.props.rosdata.fredabygg)}
            </div>
            <div className="textstyle">
              Kraftledning:
              {this.props.rosdata && this.props.rosdata.kraftledning}
            </div>
            <div className="textstyle">
              Kvikkleire:{this.props.rosdata && this.props.rosdata.kvikkleire}
            </div>
            <div className="textstyle">
              Kyst:{this.props.rosdata && this.props.rosdata.kyst}
            </div>
            <div className="textstyle">
              Snoskred:{this.props.rosdata && JSON.stringify(this.props.rosdata.snoskred)}
            </div>
            <div className="textstyle">
              Steinsprang:{this.props.rosdata && JSON.stringify(this.props.rosdata.steinsprang)}
            </div>

            {this.state.detail && this.createBuildingDetails(this.state.detail)}
          </div>
          <div>{this.BuildingTextList(this.props.building)}</div>
        </div>
      </div>
    );
  }

  GetDetail(Id) {
    let details = this.props.building.bygninger.find(x => x.Id === Id);
    if (details) this.setState({ detail: details });
  }
  createBuildingDetails(details) {
    return <React.Fragment>{this.createDetailRow2(details)}</React.Fragment>;
  }
  createDetailRow2(details) {
    const byggAreal = details.byggAreal;
    console.log(byggAreal);
    return (
      <React.Fragment>
        <div>ID:</div>
        <div>{details.Id}</div>
        <div>Bygningsnummer:</div>
        <div>{details.bygningsnummer}</div>
        <div>Bygningstatus:</div>
        <div>{details.matrikkelData.bygningstatus}</div>
        <div>Bygningstype:</div>
        <div>{details.matrikkelData.bygningstype}</div>
        <div>Naringsgruppe:</div>
        <div>{details.matrikkelData.naringsGruppe}</div>
        {byggAreal && this.addBuildingArea(byggAreal)}
      </React.Fragment>
    );
  }
  addBuildingArea(byggAreal) {
    return (
      <React.Fragment>
        {this.addAllValues(byggAreal)
        /*this.addValue('AntallEtasjer:', byggAreal.AntallEtasjer)*/
        }
      </React.Fragment>
    );
  }
  addAllValues(obj) {
    let keys = Object.keys(obj);
    var htmlList = [];
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      htmlList.push(this.addValue(key, obj[key]));
    }
    return htmlList;
  }
  addValue(label, value) {
    return (
      <React.Fragment>
        <div>{label}</div>
        <div>{value != null ? value : "Ingen verdi"}</div>
      </React.Fragment>
    );
  }
  createDetailRow(propName, value, index) {
    if (!(Object.getPrototypeOf(value) === Object.prototype))
      return (
        <React.Fragment key={index}>
          <div>{propName}</div>
          <div>{value}</div>
        </React.Fragment>
      );
    else {
      return Object.keys(value).map(detailKey =>
        this.createDetailRow(detailKey, value[detailKey], index + detailKey)
      );
    }
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
  BuildingTextList(building) {
    const listItems = building.bygninger.map((item, index) => {
      return (
        <li key={index} className="clickable">
          <div onClick={e => this.GetDetail(item.Id)}>
            <FontAwesomeIcon
              icon={this.getFontIcon(item.matrikkelData.bygningstype)}
            />
            <div>{item.matrikkelData.bygningstype}</div>
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

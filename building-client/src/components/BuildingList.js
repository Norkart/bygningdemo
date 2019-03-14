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
    return (
      <div className="buildinglist">
        <h1>AdresseInformasjon</h1>
        <div
          style={{
            display: "Grid",
            gridTemplateColumns: "500px auto",
            textAlign: "left"
          }}
        >
          <div className="buildingProperties">
          <div>AdresseInfo</div>
            <div>
              Postnummer:<span className="textstyle">{this.props.postalCode && this.props.postalCode}</span>
            </div>
            <div>
              Poststed:<span className="textstyle">{this.props.postalArea && this.props.postalArea}</span>
            </div>
            <div>
              AvstandBrannstasjon:
              <span className="textstyle">{this.props.rosData && this.props.rosData.AvstandBrannstasjon}</span>
            </div>
            <div>
              Flom:<span className="textstyle">{this.props.rosData && this.props.rosData.Flom}</span>
            </div>
            <div>
              Fredabygg:{this.props.rosData && JSON.stringify(this.props.rosData.Fredabygg)}
            </div>
            <div>
              Kraftledning:
              {this.props.rosData && this.props.rosData.Kraftledning}
            </div>
            <div>
              Kvikkleire:{this.props.rosData && this.props.rosData.Kvikkleire}
            </div>
            <div>
              Kyst:{this.props.rosData && this.props.rosData.Kyst}
            </div>
            <div>
              Snoskred:{this.props.rosData && JSON.stringify(this.props.rosData.Snoskred)}
            </div>
            <div>
              Steinsprang:{this.props.rosData && JSON.stringify(this.props.rosData.Steinsprang)}
            </div>

            {this.state.detail && this.createBuildingDetails(this.state.detail)}
          </div>
        
          <div>{this.BuildingTextList(this.props.building)}</div>
        </div>
      </div>
    );
  }

  GetDetail(Id) {
    let details = this.props.building.Bygninger.find(x => x.Id === Id);
    if (details) this.setState({ detail: details });
  }
  createBuildingDetails(details) {
    return <React.Fragment>{this.createDetailRow2(details)}</React.Fragment>;
  }
  createDetailRow2(details) {
    const byggAreal = details.ByggAreal;

    return (
      <React.Fragment>
        <div>ID:</div>
        <div>{details.Id}</div>
        <div>Bygningsnummer:</div>
        <div>{details.Bygningsnummer}</div>
        <div>Bygningstatus:</div>
        <div>{details.MatrikkelData.Bygningstatus}</div>
        <div>Bygningstype:</div>
        <div>{details.MatrikkelData.Bygningstype}</div>
        <div>Naringsgruppe:</div>
        <div>{details.MatrikkelData.Naringsgruppe}</div>
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
    const listItems = building.Bygninger.map((item, index) => {
      return (
        <li key={index} className="clickable">
          <div onClick={e => this.GetDetail(item.Id)}>
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

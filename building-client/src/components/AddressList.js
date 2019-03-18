import React, { Component } from "react";
import BuildingList from "./BuildingList";
import { buildingApiService } from "../util/buildingApiService";
class AddressList extends Component {
  constructor() {
    super();
    this.state = {
      adressInfo: null,
      postnumber: null,
      postalArea: null,
      rosData: null,
      feedback: null,
      adressId:null,
      buildingName: null
    };
    this.getBuildingData = this.getBuildingData.bind(this);
  }

  onClick = id => {
    this.getBuildingData(id);
  };
  async getBuildingData(id) {
    let res = await buildingApiService.GetBuilding(id, this.props.params);
    if (res) {
      let details = this.props.addList.SearchResults.find(x => x.Id === id);

      this.setState({
        adressInfo: res.data,
        rosData: res.data != null ? res.data.RosData : null,
        postnumber: details.Source.PostNummer,
        postalArea: details.Source.PostSted,
        adressId:details.Id,
        buildingName: details.Source.Text,
        feedback: null
      });
    }
  }
  render() {
    return (
      <div className="addresslist">
        <h1>Adresseliste</h1>
        {this.AddressTextList(this.props.addList)}
      </div>
    );
  }
  AddressTextList(addList) {
    const listItems = addList.SearchResults.map((item, i) => (
      <li key={i} className={"clickable"}>
        <p onClick={e => this.onClick(item.Id)}>{item.Text}</p>
      </li>
    ));

    return (
      <div>
        <ul>{listItems}</ul>
        <div>
          {this.state.adressInfo && (
            <BuildingList
              rosData={this.state.rosData}
              buildingName={this.state.buildingName}
              postalCode={this.state.postnumber}
              postalArea={this.state.postalArea}
              adressInfo={this.state.adressInfo}
              adressId={this.state.adressId}
            />
          )}
        </div>
      </div>
    );
  }
}
export default AddressList;

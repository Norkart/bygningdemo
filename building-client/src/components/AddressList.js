import React, { Component } from "react";
import BuildingList from "./BuildingList";
import { buildingApiService } from "../util/buildingApiService";
class AddressList extends Component {
  constructor() {
    super();
    this.state = {
      buildinglist: null,
      postnumber: null,
      postalArea: null,
      rosData: null
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick = id => {
    this.getBuildingData(id);
  };
  async getBuildingData(id) {
    console.log(id);
    let res = await buildingApiService.GetBuilding(id);
    let details = this.props.addList.SearchResults.find(x => x.Id === id);

    this.setState({
      buildinglist: res.data,
      rosData: res.data != null ? res.data.RosData : null,
      postnumber: details.Source.PostNummer,
      postalArea: details.Source.PostSted
    });
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
          {this.state.buildinglist && (
            <BuildingList
              rosData={this.state.rosData}
              postalCode={this.state.postnumber}
              postalArea={this.state.postalArea}
              building={this.state.buildinglist}
            />
          )}
        </div>
      </div>
    );
  }
}
export default AddressList;

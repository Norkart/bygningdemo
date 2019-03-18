import React, { Component } from "react";
import getSetting from "../util/getSetting";
import BuildingByPosition from "./BuildingByPosition";
const BASE_URL =
  getSetting("REACT_APP_BYGNING_BYGNINGER_BY_ADRESSE_ID_KEY") ||
  "//www.webatlas.no/WAAPI-BygningStaged/bygninger/byadresse/{adressId}";

class MainContent extends Component {
  constructor() {
    super();
    this.state = { data: null, url: BASE_URL, params: "" };
    this.createUrl = this.createUrl.bind(this);
  }

  createUrl(e) {
    let target = e.target;
    let optionName = target.id;
    let optionValue = encodeURIComponent(target.selectedOptions[0].value);
    let queryParam = optionName + "=" + optionValue;

    let newParams = this.getNewURL(optionName, this.state.params, queryParam);
    this.setState({ params: newParams });
  }
  getNewURL(optionName, oldParams, param) {
    let paramSeperator = oldParams.includes("?") ? "&" : "?";
    let res = oldParams.includes(optionName)
      ? this.replaceQueryParam(optionName, oldParams, param)
      : oldParams + paramSeperator + param;
    return res;
  }
  replaceQueryParam(name, oldParams, newParam) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp(name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(oldParams);
    if (!results) return oldParams;
    if (!results[0]) return oldParams;
    let newUrl = oldParams.replace(results[0], newParam);
    return newUrl;
  }

  componentDidUpdate(prevProps, prevState) {}
  render() {
    return (
      <main>
        <BuildingByPosition
          params={this.state.params}
          url={this.state.url}
          createUrl={this.createUrl}
          searchboxLabel="Søk på gateadresse:"
        />
      </main>
    );
  }
}
export default MainContent;

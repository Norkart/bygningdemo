import React, { Component } from "react";
import getSetting from "../util/getSetting";
import BuildingByAdresse from "./BuildingByAdresse";
import BuildingByGeometry from "./BuildingByGeometry";
import { AppContext } from "./ContentWrapper";

const BASE_URL =
  getSetting("REACT_APP_BYGNING_BYGNINGER_BY_ADRESSE_ID_KEY") ||
  "//www.webatlas.no/WAAPI-BygningStaged";

class MainContent extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      url: BASE_URL,
      params:
        "?IncludeRosData=false&IncludeByggAreal=false&IncludeMatrikkelData=false&IncludeEtasjer=false&IncludeFkbData=false&IncludeBygningStatuser=false"
    };
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
  renderComponent(defaultComponent, state, setFeedback) {
    switch (defaultComponent) {
      case "geometry":
        return (
          <BuildingByGeometry
            params={this.state.params}
            url={this.state.url + "/bygninger/bygeometry/{geometry}"}
            createUrl={this.createUrl}
          />
        );
      default:
        return (
          <BuildingByAdresse
            params={this.state.params}
            url={this.state.url + "/bygninger/byadresse/{adressId}"}
            createUrl={this.createUrl}
            setFeedback={setFeedback}
            feedback={state.feedback}
            searchboxLabel="Søk på gateadresse:"
          />
        );
    }
  }
  render() {
    return (
      <main>
        <div>
          <AppContext.Consumer>
            {({ state, setFeedback }) => {
              return (
                state.isValidKey &&
                this.renderComponent(
                  state.renderComponentName,
                  state,
                  setFeedback
                )
              );
            }}
          </AppContext.Consumer>
        </div>
      </main>
    );
  }
}
export default MainContent;

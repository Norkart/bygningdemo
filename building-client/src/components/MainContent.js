import React, { Component } from "react";
import { serchApiService } from "../util/searchApiService";
import AddressList from "./AddressList";
import UrlComponent from "./UrlComponent";

import { AppContext } from "./ContentWrapper";

import getSetting from "../util/getSetting";
const BASE_URL =
  getSetting("REACT_APP_BYGNING_BYGNINGER_BY_ADRESSE_ID_KEY") ||
  "//www.webatlas.no/WAAPI-BygningStaged";

class MainContent extends Component {
  constructor() {
    super();
    this.state = { data: null, url: BASE_URL, params: ''};
    this.getData = this.getData.bind(this);
    this.createUrl = this.createUrl.bind(this);
  }
  async getData(e, setFeedback) {
    let searchTerm = e.target.value;
    if (searchTerm && searchTerm.length > 0) {
      let res = await serchApiService.GetAdress(searchTerm);
      if (res && res.data) {
        this.setState({ data: res.data });
        setFeedback(null);
      } else {
        setFeedback("Fant ikke data");
      }
    }
  }
  createUrl(e) {
    let target = e.target;
    let optionName = target.id;
    let optionValue = encodeURIComponent(target.selectedOptions[0].value);
    let queryParam = optionName + "=" + optionValue;

    let newUrl = this.getNewURL(optionName, this.state.url, queryParam);
    this.setState({ url: newUrl });
  }
  getNewURL(optionName, url, param) {
    let paramSeperator = this.state.url.includes("?") ? "&" : "?";
    let res = url.includes(optionName)
      ? this.replaceQueryParam(optionName, url, param)
      : this.state.url + paramSeperator + param;
    return res;
  }
  replaceQueryParam(name, url, newParam) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp(name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return url;
    if (!results[0]) return url;
    let newUrl = url.replace(results[0], newParam);
    return newUrl;
  }

  componentDidUpdate(prevProps, prevState) {}
  render() {
    const { searchboxLabel } = this.props;

    return (
      <main>
        <UrlComponent url={this.state.url} params={this.state.params} onChange={this.createUrl} />
        <AppContext.Consumer>
          {({ state, setFeedback }) => {
            return (
              state.isValidKey && (
                <div>
                  {searchboxLabel}
                  <input
                    placeholder="Søk etter gateadresse ..."
                    ref={input => (this.search = input)}
                    className="searchBox"
                    onChange={e => this.getData(e, setFeedback)}
                  />
                  {state.feedback && <div> {state.feedback}</div>}
                  <div>
                    {this.state.data && (
                      <AddressList addList={this.state.data} />
                    )}
                  </div>
                </div>
              )
            );
          }}
        </AppContext.Consumer>
      </main>
    );
  }
}
export default MainContent;

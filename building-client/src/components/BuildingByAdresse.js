import React, { Component } from "react";
import AddressList from "./AddressList";
import UrlComponent from "./UrlComponent";
import { serchApiService } from "../util/searchApiService";

class BuildingByAdresse extends Component {
  constructor() {
    super();
    this.state = { data: null };
    this.getData = this.getData.bind(this);
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

  render() {
    const {
      searchboxLabel,
      params,
      url,
      createUrl,
      setFeedback,
      feedback
    } = this.props;
    return (
      <React.Fragment>
        <UrlComponent url={url} selectIds={ [
          "IncludeRosData",
          "IncludeByggAreal",
          "IncludeBygningStatuser",
          "IncludeEtasjer",
          "IncludeMatrikkelData",
          "IncludeFkbData"
        ]} params={params} onChange={createUrl} />
        <div className={'search'}>
        {searchboxLabel}
          <input
            placeholder="Søk etter gateadresse ..."
            className="searchBox"
            onChange={e => this.getData(e, setFeedback)}
          />
        </div>
        <div>
          
          {feedback && <div> {feedback}</div>}
          <div>
            {this.state.data && (
              <AddressList addList={this.state.data} params={params} />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default BuildingByAdresse;

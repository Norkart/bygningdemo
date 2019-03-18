import React, { Component } from "react";
import AddressList from "./AddressList";
import UrlComponent from "./UrlComponent";
import { AppContext } from "./ContentWrapper";
import { serchApiService } from "../util/searchApiService";

class BuildingByPosition extends Component {
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
        <UrlComponent url={url} params={params} onChange={createUrl} />
        <div>
          {searchboxLabel}
          <input
            placeholder="Søk etter gateadresse ..."
            className="searchBox"
            onChange={e => this.getData(e, setFeedback)}
          />
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
export default BuildingByPosition;

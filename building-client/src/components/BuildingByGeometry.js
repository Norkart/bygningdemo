import React, { Component } from "react";
import { AppContext } from "./ContentWrapper";
import UrlComponent from "./UrlComponent";
class BuildingByGeometry extends Component {
  render() {
    const { params, url, createUrl } = this.props;
    return (
      <React.Fragment>
        <UrlComponent url={url} params={params} onChange={createUrl} />
      </React.Fragment>
    );
  }
}
export default BuildingByGeometry;

import React, { Component } from "react";
import Map from "./Map";
import UrlComponent from "./UrlComponent";
class BuildingByGeometry extends Component {
  render() {
    const { params, url, createUrl } = this.props;
    return (
      <React.Fragment>
        <UrlComponent url={url} params={params} onChange={createUrl} />
        <Map></Map>
      </React.Fragment>
    );
  }
}
export default BuildingByGeometry;

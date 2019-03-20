import React, { Component } from "react";
import Map from "./Map";
import UrlComponent from "./UrlComponent";
class BuildingByGeometry extends Component {
  render() {
    const { url, createUrl } = this.props;
    return (
      <React.Fragment>
        <UrlComponent url={url} params={[]} onChange={createUrl} />
        <Map></Map>
      </React.Fragment>
    );
  }
}
export default BuildingByGeometry;

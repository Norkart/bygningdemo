import React, { Component } from "react";
import SelectComponent from "./SelectComponent";

class UrlComponent extends Component {
  constructor() {
    super();
    this.state = {
      selectIds: [
        "IncludeRosData",
        "IncludeByggAreal",
        "IncludeRosData",
        "IncludeBygningStatuser",
        "IncludeEtasjer",
        "IncludeMatrikkelData",
        "IncludeFkbData"
      ]
    };
  }

  render() {
    return (
      <React.Fragment>
        {this.state.selectIds.map(selectId => (
          <SelectComponent
            selectId={selectId}
            onChange={e => this.props.onChange(e)}
          />
        ))}

        {this.props.url && (
          <div
            style={{
              padding: 10,
              backgroundColor: "lightgray",
              marginBottom: 5
            }}
          >
            <div>
              <b>URL:</b> {this.props.url + this.props.params}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
export default UrlComponent;

import React, { Component } from "react";
import SelectComponent from "./SelectComponent";

class UrlComponent extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.selectIds && this.props.selectIds.map(selectId => (
          <SelectComponent
            key={selectId}
            selectId={selectId}
            onChange={e => this.props.onChange(e)}
          />
        ))}

        {this.props.url && (
          <div
            style={{
              padding: 10,
              backgroundColor: "lightgray",
              marginBottom: 5,
              wordBreak:'break-all'
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

import React, { Component } from "react";

class SelectComponent extends Component {
  render() {
    return (
      <React.Fragment>
          <label htmlFor={this.props.selectId}> {this.props.selectId} </label>
          <select id={this.props.selectId} onChange={e => this.props.onChange(e)}>
            <option value={true}> true</option>
            <option value={false}> false</option>
          </select>
      </React.Fragment>
    );
  }
}
export default SelectComponent;

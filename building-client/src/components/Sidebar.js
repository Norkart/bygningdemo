import React, { Component } from 'react';


class Sidebar extends Component {
  constructor() {
    super();
  }

  render() {
    const { children } = this.props;
    return (
      <div className={`${this.props.classNames}`}>
      {children}
      </div>
    );
  }
}
export default Sidebar;

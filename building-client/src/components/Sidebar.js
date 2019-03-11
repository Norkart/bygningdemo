import React, { Component } from 'react';
import ApiKeyInput from './ApiKeyInput';

class Sidebar extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="sidebar">
        <ApiKeyInput />
      </div>
    );
  }
}
export default Sidebar;

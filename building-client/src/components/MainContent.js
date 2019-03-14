import React, { Component } from "react";
import { serchApiService } from "../util/searchApiService";
import AddressList from "./AddressList";
import { AppContext } from "./ContentWrapper";
class MainContent extends Component {
  constructor() {
    super();
    this.state = { data: null };
    this.getData = this.getData.bind(this);
  }
  async getData(e) {
    let searchTerm = e.target.value;
    let res = await serchApiService.GetAdress(searchTerm);
    this.setState({ data: res.data });
  }
  
  componentDidUpdate(prevProps, prevState) {}
  render() {
    const { searchboxLabel } = this.props;

    return (
      <main>
        <AppContext.Consumer>
          {({ state, setApiKey }) => {
            return (
              state.isValidKey && (
                <div>
                  {searchboxLabel}
                  <input
                    placeholder="Søk etter gateadresse ..."
                    ref={input => (this.search = input)}
                    className="searchBox"
                    onChange={this.getData}
                  />
                  <div>
                    {this.state.data && (
                      <AddressList addList={this.state.data} />
                    )}
                  </div>
                </div>
              )
            );
          }}
        </AppContext.Consumer>
      </main>
    );
  }
}
export default MainContent;

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
  async getData(e, setFeedback) {
    let searchTerm = e.target.value;
    if (searchTerm && searchTerm.length > 0) {
      let res = await serchApiService.GetAdress(searchTerm);
      if (res && res.data) {
        this.setState({ data: res.data });
        setFeedback(null);
      } else {
        setFeedback("Fikk ikke noe data");
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {}
  render() {
    const { searchboxLabel } = this.props;

    return (
      <main>
        <AppContext.Consumer>
          {({ state, setFeedback }) => {
            return (
              state.isValidKey && (
                <div>
                  {searchboxLabel}
                  <input
                    placeholder="Søk etter gateadresse ..."
                    ref={input => (this.search = input)}
                    className="searchBox"
                    onChange={e => this.getData(e, setFeedback)}
                  />
                  {state.feedback && <div> {state.feedback}</div>}
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

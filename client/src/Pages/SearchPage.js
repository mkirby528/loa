import React, { Component } from "react";
import Store from "../App/MyStore";
import Navbar from "../Components/Navbar";

class SearchPage extends Component {
  render() {
    return <Navbar updateUser={this.props.updateUser} />;
  }
}
export default Store.withStore(SearchPage);

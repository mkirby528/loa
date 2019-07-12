import React, { Component } from "react";
import Store from "../App/MyStore";
import Navbar from "../Components/Navbar";
class HomePage extends Component {
  render() {
    // let store = this.props.store;
    return <Navbar updateUser={this.props.updateUser} />;
  }
}
export default Store.withStore(HomePage);

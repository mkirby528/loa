import React, { Component } from "react";
import Store from "../App/MyStore";
import AppHeader from "../Components/AppHeader";
class HomePage extends Component {
  render() {
    // let store = this.props.store;
    return <AppHeader updateUser={this.props.updateUser} />;
  }
}
export default Store.withStore(HomePage);

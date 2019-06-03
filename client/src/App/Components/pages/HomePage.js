import React, { Component } from "react";
import Store from '../../MyStore'
import './stylesheets/HomePage.css'
import AppHeader from '../AppHeader';
class HomePage extends Component {


  componentDidMount() {}

  render() {    
    let store = this.props.store
    return (
<AppHeader></AppHeader>
      );
  }
}
export default Store.withStore(HomePage)

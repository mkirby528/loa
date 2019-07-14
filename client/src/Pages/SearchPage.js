import React, { Component } from "react";
import Store from "../App/MyStore";
import Navbar from "../Components/Navbar";
import BookSearchCard from "../Components/BookSearchCard";
import "../Stylesheets/Pages/SearchPage.css";
import { Row, Col } from "antd";
class SearchPage extends Component {
  componentDidMount() {
    var url = window.location.search;
    url = url.replace("?q=", ""); // remove the ?
    alert(url);
  }

  render() {
    return (
      <Row className="root">
        <Navbar updateUser={this.props.updateUser} />
        <div className="search-page">
          <BookSearchCard />
          <BookSearchCard />
          <BookSearchCard />
          <BookSearchCard />
          <BookSearchCard />
          <BookSearchCard />
          <BookSearchCard />
        </div>
      </Row>
    );
  }
}
export default Store.withStore(SearchPage);

import React, { Component } from "react";
import Store from "../App/MyStore";
import { Row, Col } from "antd";
import "../Stylesheets/Components/BookSearchLabel.css";

class BookSearchLabel extends Component {
  render() {
    return (
      <div className="root">
        <Row>t</Row>
      </div>
    );
  }
}
export default Store.withStore(BookSearchLabel);

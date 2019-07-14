import React, { Component } from "react";
import Store from "../App/MyStore";
import { Row, Col } from "antd";
import "../Stylesheets/Components/BookSearchCard.css";

class BookSearchCard extends Component {
  render() {
    return (
      <div className="card-root">
        <Row></Row>
      </div>
    );
  }
}
export default Store.withStore(BookSearchCard);

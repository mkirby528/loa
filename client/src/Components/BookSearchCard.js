import React, { Component } from "react";
import Store from "../App/MyStore";
import { Row, Col } from "antd";
import { Menu, Dropdown, Icon, message } from "antd";
import { Redirect, withRouter } from "react-router-dom";
import StarRatings from "react-star-ratings";
import "../Stylesheets/Components/BookSearchCard.css";
import Axios from "axios";

class BookSearchCard extends Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    switch (this.props.book.userStatus) {
      case "read":
        this.state = {
          bookState: "read",
          buttonText: "\u2713 read"
        };
        break;
      case "toRead":
        this.state = {
          bookState: "toRead",
          buttonText: "\u2713 to read"
        };
        break;
      case "current":
        this.state = {
          bookState: "current",
          buttonText: "\u2713 current"
        };
        break;
      default:
        this.state = {
          bookState: "unread",
          buttonText: "Want to Read"
        };
    }
  }

  handleButtonClick() {
    if (!this.props.store.get("loggedIn")) {
      this.props.history.push("/login");
    } else {
      switch (this.state.bookState) {
        case "read":
          message.info(this.props.book.title + " is in your read list");
          break;
        case "toRead":
          message.info(this.props.book.title + " is in your to read list");
          break;
        case "current":
          message.info(
            this.props.book.title + " is in your currently reading list"
          );
          break;
        case "unread":
          message.info(
            "Added " + this.props.book.title + " to your to read list",
            2
          );
          this.setState({ bookState: "toRead", buttonText: "\u2713 to read" });
          Axios.post("/books/shelf", {
            data: { bookKey: this.props.book.key, status: "toRead" }
          });
          break;
        default:
      }
    }
  }

  handleMenuClick(e) {
    if (!this.props.store.get("loggedIn")) {
      this.props.history.push("/login");
    } else {
      switch (e.key) {
        case "read":
          message.info(
            "Added " + this.props.book.title + " to your read list",
            2
          );
          Axios.post("/books/shelf", {
            data: { bookKey: this.props.book.key, status: "read" }
          });
          this.setState({ bookState: "read", buttonText: "\u2713 read" });
          break;
        case "toRead":
          Axios.post("/books/shelf", {
            data: { bookKey: this.props.book.key, status: "toRead" }
          });
          message.info(
            "Added " + this.props.book.title + " to your to read list",
            2
          );

          this.setState({ bookState: "toRead", buttonText: "\u2713 to read" });
          break;
        case "current":
          Axios.post("/books/shelf", {
            data: { bookKey: this.props.book.key, status: "current" }
          });
          message.info(
            "Added " + this.props.book.title + " to your current books list",
            2
          );

          this.setState({ bookState: "current", buttonText: "\u2713 current" });
          break;
        case "none":
          Axios.delete("/books/unshelf", {
            data: { bookKey: this.props.book.key }
          });
          message.info(
            "Removed " + this.props.book.title + " from your lists",
            2
          );
          this.setState({ bookState: "unread", buttonText: "Want to Read" });
          break;
        default:
      }
    }
  }

  render() {
    if (this.props.book.authors === undefined) {
      var authors = [];
      var author_keys = [];
    } else {
      authors = this.props.book.authors.split(",");
      author_keys = this.props.book.author_keys.split(",");
    }
    if (this.props.book.rating === undefined) {
      var rating = 0;
    } else {
      rating = this.props.book.rating / 10;
    }
    var cover =
      "http://covers.openlibrary.org/b/id/" +
      this.props.book.cover_image +
      "-M.jpg";

    var menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="read">Read</Menu.Item>
        <Menu.Item key="current">Current</Menu.Item>
        <Menu.Item key="toRead">To Read</Menu.Item>
        <Menu.Item key="none">Unshelf</Menu.Item>
      </Menu>
    );

    return (
      <div className="card-root">
        <Row className="card-row">
          <Col xs={5} className="img-col">
            <img alt="Book Cover" className="bookCover" src={cover}></img>
          </Col>
          <Col xs={1} />
          <Col xs={18} className="info-col">
            <h1 className="book-title">
              <a href={this.props.book.key}>{this.props.book.title}</a>
            </h1>
            <div className="author-info">
              <h2>By:&nbsp;</h2>
              {authors.map((e, i) => {
                const rowLen = authors.length;
                if (rowLen === i + 1) {
                  return (
                    <h2 key={i}>
                      <a href={"author/" + author_keys[i]}> {authors[i]}</a>
                    </h2>
                  );
                } else {
                  return (
                    <h2 key={i}>
                      <a href={"author/" + author_keys[i]}>{authors[i]},</a>
                    </h2>
                  );
                }
              })}
            </div>
            <div id="stars-status">
              <div className="rating">
                <StarRatings
                  rating={rating}
                  starRatedColor="#09bc8a"
                  numberOfStars={5}
                  starDimension="30px"
                  starSpacing="5px"
                  name="rating"
                />
              </div>
              <div className="status-div">
                <button
                  className="status-button"
                  id={this.state.bookState + "-status"}
                  onClick={this.handleButtonClick}
                >
                  {this.state.buttonText}
                </button>
                <Dropdown overlay={menu}>
                  <Icon className="dropdown-icon" type="down" />
                </Dropdown>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default withRouter(Store.withStore(BookSearchCard));

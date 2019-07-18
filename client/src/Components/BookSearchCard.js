import React, { Component } from "react";
import Store from "../App/MyStore";
import { Row, Col } from "antd";
import StarRatings from "react-star-ratings";
import "../Stylesheets/Components/BookSearchCard.css";

class BookSearchCard extends Component {
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
            <StarRatings
              rating={rating}
              starRatedColor="#09bc8a"
              numberOfStars={5}
              starDimension="30px"
              starSpacing="5px"
              name="rating"
            />
          </Col>
        </Row>
      </div>
    );
  }
}
export default Store.withStore(BookSearchCard);

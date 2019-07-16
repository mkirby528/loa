import React, { Component } from "react";
import Store from "../App/MyStore";
import Navbar from "../Components/Navbar";
import BookSearchCard from "../Components/BookSearchCard";
import "../Stylesheets/Pages/SearchPage.css";
import { Row } from "antd";
import axios from "axios";
import { throws } from "assert";
import { resolve } from "path";
class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      loading: true
    };
  }
  componentDidMount() {
    var url = window.location.search;
    var search = url.replace("?q=", ""); // remove the ?q=
    axios.get("/books?search=" + search).then(results => {
      this.setState({ books: results.data, loading: false });
      console.log(this.state.books);
    });
  }

  render() {
    return (
      <Row className="root">
        <Navbar updateUser={this.props.updateUser} />
        <div className="search-page">
          <div>
            {/* {this.state.books.map((e, i) => (
              <BookSearchCard book={e} key={i}></BookSearchCard>
            ))} */}
          </div>
        </div>
      </Row>
    );
  }
}
export default Store.withStore(SearchPage);

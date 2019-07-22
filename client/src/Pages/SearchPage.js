import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Store from "../App/MyStore";
import Navbar from "../Components/Navbar";
import BookSearchCard from "../Components/BookSearchCard";
import "../Stylesheets/Pages/SearchPage.css";
import { Row } from "antd";
import axios from "axios";
class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.updateSearch = this.updateSearch.bind(this);
    this.state = {
      books: [],
      loading: true
    };
  }
  componentDidMount() {
    var url = window.location.search;
    var search = url.replace("?q=", "");
    axios
      .get("/books?search=" + search, {
        paramas: { user: "hi" }
      })
      .then(results => {
        this.setState({ books: results.data, loading: false });
      });
  }
  updateSearch(search) {
    axios.get("/books?search=" + search).then(results => {
      this.setState({ books: results.data, loading: false });
    });
  }

  render() {
    return (
      <Row className="root">
        <Navbar
          updateSearch={this.updateSearch}
          updateUser={this.props.updateUser}
        />
        <div className="search-page">
          <div>
            {this.state.books.map((e, i) => (
              <BookSearchCard book={e} key={i}></BookSearchCard>
            ))}
          </div>
        </div>
      </Row>
    );
  }
}
export default withRouter(Store.withStore(SearchPage));

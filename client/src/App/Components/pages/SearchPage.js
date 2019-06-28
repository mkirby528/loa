import React, { Component } from "react";
import Store from "../../MyStore";
import AppHeader from "../AppHeader";
import { withStyles } from "@material-ui/core/styles";
import BookSearchLabel from "../BookSearchLabel";
import List from "@material-ui/core/List";

const styles = {
  searchPage: {
    margin: "0",
    padding: "0",
    height: "100%",
    width: "100vw",
    overflow: "hidden"
  },
  bg: {
    overflow: "auto",
    margin: "0",
    padding: "0",
    height: "100%",
    maxHeight: "100%",
    backgroundColor: "#09bc8a"
  },
  list: {
    marginBottom: "100px",
    padding: "50px"
  }
};

class SearchPage extends Component {
  render() {
    const { classes } = this.props;
    // let store = this.props.store;
    return (
      <div className={classes.searchPage}>
        <AppHeader updateUser={this.props.updateUser} />
        <div className={classes.bg}>
          {/* <Paper
            style={{
              height: "100%",
              maxHeight: "100%",
              maxWidth: "100%",
              overflow: "auto",
              backgroundColor: "#508991"
            }}
          > */}
          <List className={classes.list}>
            <BookSearchLabel />
            <BookSearchLabel />
            <BookSearchLabel />
            <BookSearchLabel />
            <BookSearchLabel />
            <BookSearchLabel />
            <BookSearchLabel />
            <BookSearchLabel />
            <BookSearchLabel />
            <BookSearchLabel />
          </List>
          {/* </Paper> */}
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Store.withStore(SearchPage));

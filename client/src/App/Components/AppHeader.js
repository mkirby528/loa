import React, { Component } from "react";
import Store from "../MyStore";
import bookLogo from "./res/book_icon_logo.png";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Typography } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import "typeface-roboto";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import axios from "axios";
import Select from "@material-ui/core/Select";

const styles = {
  root: {
    margin: "0",
    maxWidth: "100vw",
    padding: "0 8vw 0 8vw",
    height: "12%",
    maxHeight: "12%",
    backgroundColor: "#2f4858"
    // border: "4px solid red"
  },

  logo: {
    marginLeft: -30,
    marginRight: 5
  },
  title: {
    fontSize: 60,
    overflow: "hidden"
  },
  Button: {
    width: 150,
    height: "50%",
    color: "white",
    fontSize: 16,
    background: "#175676",
    margin: 10
  },
  search: {
    marginLeft: 100,
    marginRight: 100,
    flex: 1,
    background: "#175676",
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  searchIcon: {
    color: "white"
  },
  Select: {
    "&:before": {
      borderColor: "white"
    },
    "&:after": {
      borderColor: "white"
    },
    // border: "3px solid white",
    color: "white",
    background: "#2E6683",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    width: "auto",
    fontSize: 18,
    padding: "0px 5px 0px 5px",
    fontWeight: "bold",
    textAlign: "center",
    position: "relative"
  },
  selectIcon: {
    color: "white"
  },
  textField: {
    color: "white",
    flex: 1,
    fontSize: 24
  },
  AccountCircle: {
    color: "white",
    width: 64,
    height: 64
  }
};

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myBooksOpen: false,
      myAccountOpen: false,
      searchField: "all",
      search: ""
    };
    this.handleMyAccountClose = this.handleMyAccountClose.bind(this);
    this.handleMyAccountToggle = this.handleMyAccountToggle.bind(this);
    this.handleMyBooksClose = this.handleMyBooksClose.bind(this);
    this.handleMyBooksToggle = this.handleMyBooksToggle.bind(this);
    this.logout = this.logout.bind(this);
    this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this);
    this.handleSearchFieldOpen = this.handleSearchFieldOpen.bind(this);
    this.handleSearchFieldClose = this.handleSearchFieldClose.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }
  handleSearchChange(evt) {
    this.setState({
      search: evt.target.value
    });
  }
  handleSearch() {
    axios
      .get("books?search=" + this.state.search)
      .then(response => {
        alert(response.data[0]["title"] + " by " + response.data[0]["author1"]);
      })
      .catch(e => console.log(e));
  }

  handleMyBooksClose() {
    this.setState(state => ({ myBooksOpen: !state.myBooksOpen }));
  }

  handleMyBooksToggle = () => {
    this.setState(state => ({ myBooksOpen: !state.myBooksOpen }));
  };
  handleMyAccountClose = event => {
    if (this.anchorEl2.contains(event.target)) {
      return;
    }

    this.setState({ myAccountOpen: false });
  };
  handleMyAccountToggle = () => {
    this.setState(state => ({ myAccountOpen: !state.myAccountOpen }));
  };

  handleSearchFieldClose() {}
  handleSearchFieldOpen() {}
  handleSearchFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  logout(event) {
    event.preventDefault();
    axios
      .get("/users/logout")
      .then(response => {
        if (response.status === 200) {
          this.props.updateUser({
            loggedIn: false,
            username: null,
            firstname: null,
            lastname: null,
            email: null
          });
          this.forceUpdate();
        }
      })
      .catch(error => {
        console.log("Logout error: " + error);
      });
  }

  render() {
    const { myBooksOpen, myAccountOpen } = this.state;
    const { classes } = this.props;
    let store = this.props.store;
    return (
      <div>
        <AppBar position="static" className={classes.root}>
          <Toolbar>
            <Link to="/">
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
              >
                <img
                  alt="App Logo"
                  className={classes.logo}
                  src={bookLogo}
                  height="85"
                  width="85"
                />
              </IconButton>
            </Link>
            <Typography
              className={classes.title}
              align="left"
              variant="h6"
              color="inherit"
            >
              BetterReads
            </Typography>
            <Paper className={classes.search}>
              <InputBase
                placeholder="Search..."
                className={classes.textField}
                onChange={this.handleSearchChange}
              />

              <Select
                classes={{
                  icon: classes.selectIcon
                }}
                disableUnderline
                autoWidth={true}
                className={classes.Select}
                open={this.state.open}
                onClose={this.handleSearchFieldClose}
                onOpen={this.handleSearchFieldOpen}
                value={this.state.searchField}
                onChange={this.handleSearchFieldChange}
                inputProps={{
                  name: "searchField",
                  id: "searchField"
                }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value={"books"}>Books</MenuItem>
                <MenuItem value={"authors"}>Authors</MenuItem>
                <MenuItem value={"users"}>Users</MenuItem>
              </Select>

              <IconButton onClick={this.handleSearch}>
                <SearchIcon className={classes.searchIcon} />
              </IconButton>
            </Paper>
            <div>
              <Button
                className={classes.Button}
                buttonRef={node => {
                  this.myBooksAnchor = node;
                }}
                aria-owns={myBooksOpen ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={this.handleMyBooksToggle}
              >
                My Books
                <ExpandMoreIcon />
              </Button>
              <Popper
                open={myBooksOpen}
                anchorEl={this.myBooksAnchor}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom"
                    }}
                  >
                    <Paper id="menu-list-grow">
                      <ClickAwayListener onClickAway={this.handleMyBooksClose}>
                        <MenuList>
                          <Link
                            to="allMyBooks"
                            style={{ textDecoration: "none" }}
                          >
                            <MenuItem>All Books</MenuItem>
                          </Link>
                          <Link
                            to="myCurrentBooks"
                            style={{ textDecoration: "none" }}
                          >
                            <MenuItem>Currently Reading</MenuItem>
                          </Link>
                          <Link
                            to="myToReadBooks"
                            style={{ textDecoration: "none" }}
                          >
                            <MenuItem>To Read</MenuItem>
                          </Link>
                          <Link
                            to="myReadBooks"
                            style={{ textDecoration: "none" }}
                          >
                            <MenuItem>Read</MenuItem>
                          </Link>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
            {store.get("loggedIn") && (
              <div>
                <IconButton
                  buttonRef={node => {
                    this.anchorEl2 = node;
                  }}
                  onClick={this.handleMyAccountToggle}
                >
                  <AccountCircle className={classes.AccountCircle} />
                </IconButton>
                <Popper
                  open={myAccountOpen}
                  anchorEl={this.anchorEl2}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      id="menu-list-grow"
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom"
                      }}
                    >
                      <Paper>
                        <ClickAwayListener
                          onClickAway={this.handleMyAccountClose}
                        >
                          <MenuList>
                            <Link
                              to="/myAccount"
                              style={{ textDecoration: "none" }}
                            >
                              <MenuItem>My Account</MenuItem>
                            </Link>
                            <Link
                              to="myFriends"
                              style={{ textDecoration: "none" }}
                            >
                              <MenuItem>Friends</MenuItem>
                            </Link>
                            <MenuItem onClick={this.logout}>Logout</MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            )}
            {!store.get("loggedIn") && (
              <Link to="/login">
                <Button className={classes.Button}>Login</Button>
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

AppHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Store.withStore(AppHeader));

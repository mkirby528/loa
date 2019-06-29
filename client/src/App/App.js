import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "../Stylesheets/App.css";
import LoginPage from "../Pages/LoginPage";
import RegistrationPage from "../Pages/RegistrationPage";
import HomePage from "../Pages/HomePage";
import SearchPage from "../Pages/SearchPage";
import { Helmet } from "react-helmet";
import axios from "axios";
import Store from "./MyStore";

class App extends Component {
  constructor(props) {
    super(props);

    this.store = props.store;
    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.store.set("loggedIn")(userObject.loggedIn);
    this.store.set("username")(userObject.username);
    this.store.set("userEmail")(userObject.email);
    this.store.set("userFirstName")(userObject.firstname);
    this.store.set("userLastName")(userObject.lastname);
  }

  getUser() {
    axios.get("/users/").then(response => {
      if (response.data.user) {
        this.store.set("loggedIn")(true);
        this.store.set("username")(response.data.user.username);
        this.store.set("userEmail")(response.data.user.email);
        this.store.set("userFirstName")(response.data.user.firstname);
        this.store.set("userLastName")(response.data.user.lastname);
      } else {
        this.store.set("loggedIn")(false);
        this.store.set("username")(null);
        this.store.set("userEmail")(null);
        this.store.set("userFirstName")(null);
        this.store.set("userLastName")(null);
      }
    });
  }
  render() {
    return (
      <div className="App">
        <Helmet>
          <meta charSet="utf-8" />
          <title>BetterReads</title>
        </Helmet>
        <Switch className="Pages">
          <Route
            exact
            path="/login"
            render={() => <LoginPage updateUser={this.updateUser} />}
          />
          <Route
            exact
            path="/register"
            render={() => <RegistrationPage updateUser={this.updateUser} />}
          />
          <Route
            exact
            path="/"
            render={() => <HomePage updateUser={this.updateUser} />}
          />
          <Route
            path="/search"
            render={() => <SearchPage updateUser={this.updateUser} />}
          />
        </Switch>
      </div>
    );
  }
}

export default Store.withStore(App);

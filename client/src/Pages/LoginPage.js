import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Stylesheets/Pages/LoginPage.css";
import bookLogo from "../Resources/book_icon_logo.png";
import axios from "axios";
import { withRouter } from "react-router-dom";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showErrorMessage: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios
      .post("/users/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        if (response.status === 200) {
          this.props.updateUser({
            loggedIn: true,
            username: response.data.username,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            email: response.data.email
          });
          // update the state to redirect to home
          this.props.history.push("/");
        }
      })
      .catch(error => {
        console.log("login error: " + error);
        console.log(error);
        this.setState({ showErrorMessage: true });
      });
  }

  render() {
    var errorMessage = null;
    if (this.state.showErrorMessage) {
      errorMessage = (
        <p className="errorMessage">Incorrect username or password</p>
      );
    }

    return (
      <div className="login-page">
        <div className="form">
          <img src={bookLogo} alt="Logo" />
          <form className="login-form">
            <input
              type="text"
              placeholder="Username"
              id="username"
              onChange={this.handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            {errorMessage}
            <button type="submit" onClick={this.handleSubmit}>
              login
            </button>
            <p className="message">
              Not registered? <Link to="/register">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginPage);

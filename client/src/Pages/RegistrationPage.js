import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Stylesheets/Pages/RegistrationPage.css";
import bookLogo from "../Resources/book_icon_logo.png";
import axios from "axios";
import { Redirect } from "react-router-dom";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
      confirmedPassword: "",
      redirectTo: null
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
      .post("/users", {
        username: this.state.username,
        password: this.state.password,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email
      })
      .then(response => {
        this.setState({
          redirectTo: "/login"
        });
      })
      .catch(error => {
        console.log("login error: ");
        console.log(error);
      });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div className="Registration-page">
          <div className="form">
            <img src={bookLogo} alt="Logo" />
            <form className="Registration-form">
              <input
                type="text"
                placeholder="First Name"
                id="firstname"
                value={this.state.firstname}
                onChange={this.handleChange}
              />
              <input
                type="text"
                placeholder="Last Name"
                id="lastname"
                value={this.state.lastname}
                onChange={this.handleChange}
              />
              <input
                type="text"
                placeholder="Email"
                id="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <input
                type="text"
                placeholder="Username"
                id="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                id="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                id="confirmedPassword"
                value={this.state.confirmedPassword}
                onChange={this.handleChange}
              />

              <button type="submit" onClick={this.handleSubmit}>
                Register
              </button>
              <p className="message">
                Already registered? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      );
    }
  }
}
export default RegistrationForm;

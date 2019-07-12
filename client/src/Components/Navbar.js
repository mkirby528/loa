import React, { Component } from "react";
import Store from "../App/MyStore";
import "../Stylesheets/Components/Navbar.css";
import bookLogo from "../Resources/book_icon_logo.png";
import { NavLink, Link } from "react-router-dom";
import { Typography, Divider, Row, Col } from "antd";
import { Input, PageHeader } from "antd";
import { Menu, Dropdown, Button, Icon, message } from "antd";
import { MdAccountCircle } from "react-icons/md";
import axios from "axios";

const { Title, Paragraph, Text } = Typography;

const { Search } = Input;

class AppBar extends Component {
  constructor(props) {
    super(props);

    this.onAccountMenuClick = this.onAccountMenuClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  onAccountMenuClick(event) {
    if (event.key == "logout") {
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
  }
  handleSearch(search) {
    axios
      .get("books?search=" + search)
      .then(response => {
        alert(response.data[0]["title"] + " by " + response.data[0]["author1"]);
      })
      .catch(e => console.log(e));
  }

  myBooksMenu = (
    <Menu mode="">
      <Menu.Item>
        <NavLink to="/allMyBooks">
          <span>All Books</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/myCurrentBooks">
          <span>Currently Reading</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/myToReadBooks">
          <span>To Read</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/myReadBooks">
          <span>Read</span>
        </NavLink>
      </Menu.Item>
    </Menu>
  );
  render() {
    let store = this.props.store;
    let loginOrAccount;

    var accountMenu = (
      <Menu onClick={this.onAccountMenuClick} mode="">
        <Menu.Item>
          <NavLink to="/myAccount">
            <span>My Account</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="/myFriends">
            <span>My Friends</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="logout">
          <span>Sign Out</span>
        </Menu.Item>
      </Menu>
    );

    if (store.get("loggedIn")) {
      loginOrAccount = (
        <Dropdown overlay={accountMenu} placement="bottomCenter">
          <MdAccountCircle id="accountCircle" size={75} />
        </Dropdown>
      );
    } else {
      loginOrAccount = (
        <Link to="login">
          <Button>Login</Button>
        </Link>
      );
    }

    return (
      <div className="navbar">
        <Row className="row">
          <Col id="logoTitle" className="col" xs={1}>
            <Link to="/">
              <img id="logo" src={bookLogo} />
            </Link>
          </Col>
          <Col id="tileCol" className="col" xs={5}>
            <Title id="titleText">Better Reads</Title>
          </Col>
          <Col className="col" xs={12}>
            <Search
              placeholder="Search..."
              enterButton="Search"
              onSearch={value => this.handleSearch(value)}
              style={{ fontSize: 50 }}
              size="large"
            />
          </Col>
          <Col xs={4} className="col" />
          <Col id="myBooksCol" className="col" xs={1}>
            <Dropdown overlay={this.myBooksMenu} placement="bottomCenter">
              <Button>
                My Books
                <Icon type="down" />
              </Button>
            </Dropdown>
          </Col>
          <Col className="col" xs={1}>
            {loginOrAccount}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Store.withStore(AppBar);

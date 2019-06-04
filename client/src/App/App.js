import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import LoginPage from "./Components/pages/LoginPage";
import RegistrationPage from "./Components/pages/RegistrationPage";
import HomePage from "./Components/pages/HomePage"
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
    this.store.set('loggedIn')(userObject.loggedIn);
    this.store.set('username')(userObject.username);
    this.store.set('userEmail')(userObject.email);
    this.store.set('userFirstName')(userObject.firstname);
    this.store.set('userLastName')(userObject.lastname)

  }

  getUser() {
    axios.get("/users/").then(response => {
      console.log("Get user response: ");
      console.log(response.data);
      if (response.data.user) {
        console.log("Get User: There is a user saved in the server session: ");
        console.log(this.store);
        this.store.set('loggedIn')(true);
        this.store.set('username')(response.data.user.username);
        this.store.set('userEmail')(response.data.user.email);
        this.store.set('userFirstName')(response.data.user.firstname);
        this.store.set('userLastName')(response.data.user.lastname)
     
      } else {
        console.log("Get user: no user");
        
          this.store.set('loggedIn')(false);
          this.store.set('username')(null);
        
      }
    });
  }
  render() {
    let store = this.props.store;
    return (
        <div className="App">
        <Helmet>
          <meta charSet="utf-8" />
          <title>BetterReads</title>
        </Helmet>
        <Switch className="Pages">
          <Route
            exact path="/login"
            render={() =>
               <LoginPage
                updateUser={this.updateUser}
              />}
          />
          <Route exact path="/register" component={RegistrationPage} />
          <Route exact path= "/" render={()=> <HomePage updateUser ={this.updateUser}/>}></Route>
        </Switch>
      </div>
    );
  }
}

export default Store.withStore(App)

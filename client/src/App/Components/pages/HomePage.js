import React, { Component } from "react";
import Store from '../../MyStore'
import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
// import { fade } from '@material-ui/core/styles/colorManipulator';
// import { withStyles } from '@material-ui/core/styles';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
import bookLogo from "../res/book_icon_logo.png";
import './stylesheets/HomePage.css'

class HomePage extends Component {


  componentDidMount() {}

  render() {    
    let store = this.props.store
    return (
      <div>
      <AppBar  position="static">
      <div className ="AppBar">
      <img src={bookLogo} alt="Logo" />
      <h2>BetterReads</h2>
      </div>
      </AppBar>
     </div>
    );
  }
}
export default Store.withStore(HomePage)

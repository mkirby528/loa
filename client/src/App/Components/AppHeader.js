import React, { Component } from "react";
import Store from '../MyStore'
import bookLogo from "./res/book_icon_logo.png";
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Typography, withTheme, } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import 'typeface-roboto';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from "@material-ui/core/Paper"
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {Link} from 'react-router-dom'
import axios from "axios"

const styles = {
    root: {
        flexGrow: 1,
        background: "#2f4858",
    },

    logo: {
        marginLeft: -30,
        marginRight: 5,
    },
    title: {
        fontSize: 60,
    },
    Button: {
        width: 150,
        height: '50%',
        color: 'white',
        fontSize: 18,
        background: '#175676',
        margin: 10,
    },
    search: {
        marginLeft: 100,
        marginRight: 100,
        flex: 1,
        background: '#175676',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    searchIcon: {
        color: 'white',
    },
    textField: {
        color: 'white',
        flex: 1,
        fontSize: 24,
    },
    AccountCircle: {
        color: 'white',
        width: 64,
        height: 64,
    }
};


class AppHeader extends Component {
    constructor(props){
        super(props);
        this.state = {
            myBooksOpen: false,
            myAccountOpen: false,
        };
        this.handleMyAccountClose = this.handleMyAccountClose.bind(this);
        this.handleMyAccountToggle = this.handleMyAccountToggle.bind(this);
        this.handleMyBooksClose = this.handleMyBooksClose.bind(this);
        this.handleMyBooksToggle = this.handleMyBooksToggle.bind(this)
        this.logout = this.logout.bind(this);
        
    }
 

    handleMyBooksClose = event => {
        if (this.myBooksAnchor.contains(event.target)) {
            return;
        }

        this.setState({ myBooksOpen: false });
    };
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
    logout(event) {
        event.preventDefault()
        axios.get('/users/logout').then(response => {
          if (response.status === 200) {
            this.props.updateUser({
                loggedIn: false,
                username: null,
                firstname: null,
                lastname: null,
                email: null,
            })
            this.forceUpdate();
 
          }
        }).catch(error => {
            console.log('Logout error: ' + error)
        })

    }


    render() {
        const { myBooksOpen: myBooksOpen, myAccountOpen: myAccountOpen } = this.state;
        const { classes } = this.props;
        let store = this.props.store
        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.root}>
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <img className={classes.logo} src={bookLogo} height='85' width='85'></img>
                        </IconButton>
                        <Typography className={classes.title} align="left" variant="h6" color="inherit" >
                            BetterReads
                  </Typography>
                        <Paper className={classes.search}>
                            <InputBase placeholder="Search..." className={classes.textField}></InputBase>
                            <IconButton>
                                <SearchIcon className={classes.searchIcon} />
                            </IconButton>
                        </Paper>
                        <div>
                            <Button className={classes.Button}
                                buttonRef={node => {
                                    this.myBooksAnchor = node;
                                }}
                                aria-owns={myBooksOpen ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleMyBooksToggle}
                            >
                                My Books
                                <ExpandMoreIcon />
                            </Button>
                            <Popper open={myBooksOpen} anchorEl={this.myBooksAnchor} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper id="menu-list-grow"
                                        >
                                            <ClickAwayListener onClickAway={this.handleMyBooksClose}>
                                                <MenuList>
                                                    <MenuItem onClick={this.handleMyBooksClose}>All Books</MenuItem>
                                                    <MenuItem onClick={this.handleMyBooksClose}>Currently Reading</MenuItem>
                                                    <MenuItem onClick={this.handleMyBooksClose}>To Read</MenuItem>
                                                    <MenuItem onClick={this.handleMyBooksClose}>Read</MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </div>
                        {store.get('loggedIn') &&
                            <div>
                                <IconButton buttonRef={node => {
                                    this.anchorEl2 = node;
                                }} onClick={this.handleMyAccountToggle}>
                                    <AccountCircle className={classes.AccountCircle} />
                                </IconButton>
                                <Popper open={myAccountOpen} anchorEl={this.anchorEl2} transition disablePortal>
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            id="menu-list-grow"
                                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                        >
                                            <Paper>
                                                <ClickAwayListener onClickAway={this.handleMyAccountClose}>
                                                    <MenuList>
                                                        <MenuItem onClick={this.handleMyAccountClose}>My Account</MenuItem>
                                                        <MenuItem onClick={this.handleMyAccountClose}>Friends</MenuItem>
                                                        <MenuItem onClick={this.logout}>Logout</MenuItem>
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </div>}
                        {!store.get('loggedIn') &&
                         <Link to="/login">
                            <Button className={classes.Button}>
                                Login
                            </Button>
                            </Link>

                        }
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

AppHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Store.withStore(AppHeader));

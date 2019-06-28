import React, { Component } from "react";
import Store from "../MyStore";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import StarRatings from "react-star-ratings";

const styles = {
  root: {
    padding: "20px"
  },
  card: {
    color: "white",
    backgroundColor: "#74b3ce",
    margin: "0 auto 0 auto",
    padding: "0",
    // display: "flex",
    width: "40%",
    maxWidth: "40%"
  },
  details: {
    display: "flex",
    flexDirection: "row"
  },
  content: {
    flex: "auto",
    textAlign: "left"
  },
  cover: {
    width: 100
  },
  titleText: {
    textDecoration: "underline",

    fontWeight: "bold",
    fontSize: "12"
  }
};

class BookSearchLabel extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardMedia
              className={classes.cover}
              src="http://covers.openlibrary.org/b/ID/6978883-M.jpg"
              title="Book Cover "
              component="img"
            />
            <CardContent className={classes.content}>
              <Typography
                className={classes.titleText}
                color="inherit"
                component="h6"
                variant="h6"
              >
                Dune
              </Typography>
              <Typography color="inherit" component="heading" variant="heading">
                by Author
              </Typography>
              <StarRatings
                starRatedColor="#175676"
                className={classes.rating}
                rating={4.5}
                starDimension="20px"
                starSpacing="5px"
              />
            </CardContent>
            <CardContent className={classes.buttons}>
              <Button>Add to To Read</Button>
            </CardContent>
          </div>
        </Card>
      </div>
    );
  }
}
export default withStyles(styles)(Store.withStore(BookSearchLabel));

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./config/database");
const session = require("express-session");
const passport = require("./passport");
const cookieParser = require("cookie-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser()); // required before session.
app.set("json spaces", 2);

app.use(
  session({
    secret: "holaholaholaholaholaholahola",
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.API_PORT || 3001;

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", (req, res) => res.send("index"));

//User routes
app.use("/users", require("./routes/users"));
app.use("/books", require("./routes/books"));

//Sync Database
db.sequelize
  .sync({ alter: true })
  .then(() => console.log("Database connected"));

app.listen(API_PORT, () => console.log(`API listening on port ${API_PORT}`));

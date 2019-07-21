const express = require("express");
const router = express.Router();
const db = require("../config/database");
const User = db.User;
const passport = require("../passport/");

router.post("/", (req, res) => {
  console.log("user signup");

  const { username, password, firstname, lastname, email } = req.body;

  User.findOrCreate({
    where: {
      username: username.trim()
    },
    defaults: {
      // set the default properties if it doesn't exist
      username: username.trim(),
      password: password.trim(),
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email: email.trim()
    }
  })
    .then(function(result) {
      created = result[1]; // boolean stating if it was created or not

      if (!created) {
        // false if user already exists and was not created.
        console.log("User Exists With that username");
      }
      res.send(created);
      console.log("Created user...");
    })
    .catch(function(err) {
      // print the error details
      console.log(err);
    });
});

router.post(
  "/login",
  function(req, res, next) {
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    var userInfo = {
      username: req.user.username
    };

    res.send(userInfo);
    console.log(userInfo.username);
  }
);

router.get("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: "logging out" });
  } else {
    res.json({ user: null });
  }
});

router.get("/", (req, res, next) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

module.exports = router;

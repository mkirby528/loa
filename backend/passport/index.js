const passport = require("passport");
const LocalStrategy = require("./localStrategy");
const db = require("../config/database");
const User = db.User;
// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
  done(null, user.username);
});

// user object attaches to the request as req.user
passport.deserializeUser((username, done) => {
  User.findOne({
    where: {
      username: username
    }
  }).then(function(user) {
    if (user == null) {
      done(new Error("Wrong user id."));
    }

    done(null, user);
  });
});

//  Use Strategies
passport.use(LocalStrategy);

module.exports = passport;

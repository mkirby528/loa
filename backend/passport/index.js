const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const User = require('../models/user')

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
    done(null, user.id)
})

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
    User.findOne({
        where: {
          'id': id
        }
      }).then(function (user) {
        if (user == null) {
          done(new Error('Wrong user id.'))
        }
        
        done(null, user)
      })
})

//  Use Strategies 
passport.use(LocalStrategy)

module.exports = passport
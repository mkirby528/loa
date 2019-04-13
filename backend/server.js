const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./config/database');
const user = require('./models/User')
const passport = require('passport')
const session = require('express-session')


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// For Passport
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions



// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.API_PORT || 3001;


app.use(express.static(path.join(__dirname, 'client/build')));



app.get('/', (req, res) => res.send('index'));

//User routes
app.use('/users',require("./routes/users"))


//load passport strategies
require('./config/passport/passport')(passport,user);

//Sync Database
db.sync().then(function() {
    console.log('Nice! Database looks fine')
});
 
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
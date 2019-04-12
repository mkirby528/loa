const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./config/database');
var passport   = require('passport')


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Test DB
db.authenticate()
.then(()=> console.log('Database Connected...'))
.catch(err =>console.log("Error: " + err))



// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.API_PORT || 3001;


app.use(express.static(path.join(__dirname, 'client/build')));



app.get('/', (req, res) => res.send('index'));

//User routes
app.use('/users',require("./routes/users"))

 
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
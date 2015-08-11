var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mysql = require('mysql');

var path = require('path');
var rootPath = path.join(__dirname + '../..');

//Database
var knex = require('./config/db.js').knex;
var bookshelf = require('bookshelf')(knex);


//Parser
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: true})); // get information from html forms
app.use(bodyParser.json()); // get information from html forms




//View Setup
app.use(express.static(path.join(rootPath + '/public'))); // public
app.use('/angular', express.static(path.join(rootPath + '/angular')));
app.set('view engine', 'ejs');

//Passport setup
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./config/passport')(passport); // pass passport for configuration

// routes ======================================================================
require('./routes.js')(app, passport); 

app.listen(port);
console.log('Example app listening at http://localhost:%s',port);
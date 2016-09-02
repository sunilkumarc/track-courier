var express = require('express');
var account_controller = require('./controllers/accounts.js');
var parcels_controller = require('./controllers/parcels.js');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var app = express();

// Middleware to parse json body
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'secret_key',
    saveUninitialized: true,
    resave: true
}));

app.get('/', function(req, res) {
    res.status(200).send("Server Working!");
});

account_controller.set(app);
parcels_controller.set(app);

var port = Number(process.env.PORT || 8000)
app.listen(port);
console.log('App running!');

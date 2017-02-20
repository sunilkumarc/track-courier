var express = require('express');
var account_controller = require('./controllers/accounts.js');
var parcels_controller = require('./controllers/parcels.js');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var cors = require('cors');
var path = require('path');
var server;

var app = express();
var user_session = null;

// Middlewares
app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './')));

app.use(session({
    secret: 'track_courier_application_secret_key',
    cookie: {
        maxAge: 300000
    },
    saveUninitialized: true,
    resave: true
}));

// app.all('*parcels*', function(req, res, next) {
//     if (req.session.username) {
//         next();
//     } else {
//         res.status(401).send("Unauthorized Macha");
//     }
// });

app.get('/', function(req, res) {
    res.status(200).send("Track Your Couriers!");
});

account_controller.set(app);
parcels_controller.set(app);

function startServer(port) {
    var port = Number(process.env.PORT || port);
    server = app.listen(port);
}

function stopServer() {
    server.close();
}

startServer(8000);

module.exports = {
    startServer: startServer,
    stopServer: stopServer
}

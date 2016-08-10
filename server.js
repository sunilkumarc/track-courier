var express = require('express');
var account_controller = require('./controllers/account');
var courier_controller = require('./controllers/courier');
var db_connection = require('./database');
var app = express();

app.get('/', function(req, res) {
    res.status(200).send("Server Working!");
});

account_controller.set(app);
courier_controller.set(app);

/*
db_connection.query("INSERT INTO parcel(name, price, weight, from_location, " +
    "to_location, dispatched_on) values($1, $2, $3, $4, $5, $6)", ['sjsu_application',
    12.41, 0.14, 'Bangalore, India', 'San Jose, California', '2016-10-10']);
var query = db_connection.query('select * from parcel');

query.on('row', function(row) {
    console.log(row);
});
*/

var port = Number(process.env.PORT || 8000)
app.listen(port);
console.log('App running!');
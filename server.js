var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

// Importing models
var Parcel = require('./models/parcel');

var server = express();

// Middleware
server.use(bodyParser.json());
server.use(cors());

// local mondodb database
var db_url = 'mongodb://localhost:27017/track-courier';

mongoose.connect(db_url, function(err, conn) {
    if(err) {
        console.log('Error while connecting to Mongoose : ' + err);
    }
});

server.get('/', function(req, res){
    res.status(200).send("Server Working Fine :D");
});

server.get('/parcels/short_details', function(req, res) {
    Parcel.find().select('name price').exec(function(err, parcels) {
        if (parcels) {
            res.send(parcels);
        } else {
            res.status(500).send('Internal Server Error Occured');
        }
    });
});

server.get('/parcel/full_details', function(req, res) {
    Parcel.find().exec(function(err, parcels) {
        if (parcels) {
            res.send(parcels);
        } else {
            res.status(500).send('Internal Server Error Occured');
        }
    });
});

var port = Number(process.env.PORT || 8000)
server.listen(port);
console.log('Server started ...');

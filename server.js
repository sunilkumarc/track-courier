var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

var server = express();

// Middleware
server.use(bodyParser.json());
server.use(cors());

server.get('/', function(req, res){
    res.status(200).send("Server Working Fine :D");
});

var port = Number(process.env.PORT || 8000)
server.listen(port);
console.log('Server started ...');
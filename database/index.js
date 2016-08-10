var postgresql = require('pg');
var connectionString = 'postgres://postgres:hello@123@localhost:5432/track-courier';

var connection = new postgresql.Client(connectionString);
connection.connect();

module.exports = connection;


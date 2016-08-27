// var db_connection = require('../models/database.js');
var random = require('../utilities/random_num_generator.js');
var models = require('../models');

module.exports.set = function(app) {
    app.get("/test", function(req, res) {
        models.Parcels.all().then(function(parcels) {
            res.send(parcels);
        });
    });

    /*
    app.get("/parcels/:id", function(req, res) {
        var result = null;
        var parcel_id = req.params.id;
        var query = db_connection.query("select * from parcels where parcel_id = '" + parcel_id + "'");

        query.on('row', function(row) {
            result = row;
        });

        query.on('end', function() {
            if (result == null)
                return res.status(204).send("No Data");
            else
                return res.json(result);
        });
    });

    app.put("/parcels/:id", function(req, res) {
        var parcel_id = req.params.id;
        var body = req.body;
    });

    app.post("/parcels", function(req, res) {
        var body = req.body;
        var parcel_id = random(10);
        var from_person_name = body.from_person_name;
        var to_person_name = body.to_person_name;
        var color = body.color;
        var weight = body.weight;
        var service_price = body.service_price;
        var dispatched_on = body.dispatched_on;
        var expected_delivery = body.expected_delivery;
        var sender_address = body.sender_address;
        var receiver_address = body.receiver_address;
        var sender_phone_no = body.sender_phone_no;
        var receiver_phone_no = body.receiver_phone_no;
        var current_location_lat = body.current_location_lat;
        var current_location_long = body.current_location_long;
        var status = "dispatched";

        db_connection.query("INSERT INTO parcels(parcel_id, from_person_name, to_person_name, color, " +
            "weight, service_price, sender_address, receiver_address, sender_phone_no, receiver_phone_no," +
            "current_location_lat, current_location_long, status)" + " values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
            [parcel_id, from_person_name, to_person_name, color, weight, service_price, sender_address,
                receiver_address, sender_phone_no, receiver_phone_no, current_location_lat, current_location_long, status],
                function(err, result) {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).send(result);
                    }
                });
    });
    */
}

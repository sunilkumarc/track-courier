var db_connection = require('../models/database.js');
var random = require('../utilities/random_num_generator.js');

module.exports.set = function(app) {
    app.get("/parcels/:id", function(req, res) {
        var parcel_id = req.params.id;
        db_connection.query("Select single * from parcels where parcel_id = " + parcel_id);
        db_connection.on("row", function(result) {
            if (result)
                res.status(200).send(result);
            else {
                res.status(200).send("Could not find the record");
            }
        });
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

        db_connection.query("INSERT INTO parcels(parcel_id, from_person_name, to_person_name, color, " +
            "weight, service_price, sender_address, receiver_address, sender_phone_no, receiver_phone_no)" +
            " values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [parcel_id, from_person_name, to_person_name,
            color, weight, service_price, sender_address, receiver_address, sender_phone_no, receiver_phone_no],
                function(err, result) {
                    if (err) {
                        res.status(500).send("Error in Storing data");
                    } else {
                        res.status(200).send(result);
                    }
                });

    });
}

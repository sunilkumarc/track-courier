var db_connection = require('../models/database.js');
var random = require('../utilities/random_num_generator.js');

module.exports.set = function(app) {
    app.get("/parcels/:id", function(req, res) {
        res.status(200).send("Parcel Details");
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

        db_connection.query("INSERT INTO parcels(parcel_id, from_person_name, to_person_name, color)" +
            " values($1, $2, $3, $4)", [parcel_id, from_person_name, to_person_name, color],
                function(err, result) {
                    if (err) {
                        res.status(500).send("Error in Storing data");
                    }
                });

        res.status(200).send("Success from POST");
    });
}

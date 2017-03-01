// var db_connection = require('../models/database.js');
var random = require('../utilities/random_num_generator.js');
var models = require('../models');
var parcels = require('../dao/parcelsDAO');

module.exports.set = function(app) {
    app.get("/parcels/:id", function(req, res) {
        parcels.getSingleParcel(req.params.id).then((parcel) => {
            if (parcel != null) {
                res.status(200).send(parcel);
            }
        }).catch((err) => {
            res.status(204).send(err);
        });
    });

    app.get("/parcels/all/ids", function(req, res) {
        models.Parcels.findAll({attributes: ['parcel_id']}).then(function(parcels) {
            if (parcels)
                res.status(200).send(parcels);
            else
                res.status(500).send("Something went wrong");
        });
    });

    app.put("/parcels/:id", function(req, res) {
        var body = req.body;

        models.Parcels.findOne({ where: { parcel_id: req.params.id }}).then(function(parcel) {
            if (parcel) {
                parcel.updateAttributes({
                    expected_delivery: body.expected_delivery,
                    current_location_lat : body.new_location_lat,
                    current_location_long : body.new_location_long,
                });
                res.status(200).send("Updated Successfully");
            } else {
                res.status(500).send("Couldn't find the parcel with this Id");
            }
        });
    });

    app.delete("/parcels/:id", function(req, res) {
        var body = req.body;

        models.Parcels.destroy({ where: { parcel_id: req.params.id }}).then(function(parcel){
            if (parcel) {
                res.status(202).send("Deleted Successfully!")
            } else {
                res.status(500).send("Couldn't find the parcel with this Id");
            }
        });
    });

    app.post("/parcels", function(req, res) {
        var body = req.body;

        models.Parcels.create({
            parcel_id : body.parcel_id,
            from_person_name : body.from_person_name,
            to_person_name : body.to_person_name,
            color : body.color,
            weight : body.weight,
            service_price : body.service_price,
            dispatched_on : body.dispatched_on,
            expected_delivery : body.expected_delivery,
            sender_address : body.sender_address,
            receiver_address : body.receiver_address,
            sender_phone_no : body.sender_phone_no,
            receiver_phone_no : body.receiver_phone_no,
            current_location_lat : body.current_location_lat,
            current_location_long : body.current_location_long,
            status : "dispatched"
        }).then(function(parcel) {
            res.status(200).send(parcel);
        }).catch(function(err) {
            res.status(500).send("Something went wrong. Couldn't save the data.");
        });
    });
}

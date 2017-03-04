var random = require('../utilities/random_num_generator.js');
var models = require('../models');
var parcels = require('../dao/parcelsDAO');

module.exports.set = function(app) {
    app.get("/parcels/:id", function(req, res) {
        parcels.getSingleParcel(req.params.id).then((parcel) => {
            if (parcel != null) {
                res.status(200).send(parcel);
            } else {
                res.status(204).send('Parcel not found');
            }
        }).catch((err) => {
            res.status(500).send(err);
        });
    });

    app.get("/parcels/all/ids", function(req, res) {
        parcels.getAllParcels().then((parcels) => {
            if (parcels != null) {
                res.status(200).send(parcels);
            } else {
                res.status(204).send('No parcels found in the database');
            }
        }).catch((err) => {
            res.status(500).send(err);
        });
    });

    app.put("/parcels/:id", function(req, res) {
        parcels.updateParcel(req.body, req.params.id).then((msg) => {
            res.status(200).send(msg);
        }).catch((err) => {
            res.status(400).send(err);
        });
    });

    app.delete("/parcels/:id", function(req, res) {
        parcels.deleteParcel(req.params.id).then((parcel) => {
            if (parcel != null) {
                res.status(200).send('Deleted Successfully');
            } else {
                res.status(400).send('Couldn\'t find the parcel');
            }
        }).catch((err) => {
            res.status(400).send(err);
        });
    });

    app.post("/parcels", function(req, res) {
        parcels.insertParcel(req.body).then((parcel) => {
            if (parcel != null) {
                res.status(200).send(parcel);
            }
        }).catch((err) => {
            res.status(400).send(err);
        });
    });
}

var models = require('../models');

getSingleParcel = function(parcel_id) {
    return new Promise((resolve, reject) => {
        models.Parcels.findOne({ where: { parcel_id: parcel_id }}).then(function(parcel) {
            if (parcel) {
                resolve(parcel);
            } else {
                resolve(null);
            }
        }).catch((err) => {
            reject('Something went wrong');
        });
    });
}

getAllParcels = function() {
    return new Promise((resolve, reject) => {
        models.Parcels.findAll().then(function(parcels) {
            if (parcels) {
                resolve(parcels);
            } else {
                resolve(null);
            }
        }).catch((err) => {
            reject('Something went wrong');
        });
    });
}

updateParcel = function(body, parcel_id) {
    return new Promise((resolve, reject) => {
        models.Parcels.findOne({ where: { parcel_id: parcel_id }}).then(function(parcel) {
            if (parcel) {
                parcel.updateAttributes({
                    expected_delivery: body.expected_delivery,
                    current_location_lat : body.new_location_lat,
                    current_location_long : body.new_location_long,
                    status : body.status
                });
                resolve("Updated Successfully");
            } else {
                reject("Couldn't find the parcel with this Id");
            }
        });
    });
}

deleteParcel = function(parcel_id) {
    return new Promise((resolve, reject) => {
        models.Parcels.destroy({ where: { parcel_id: parcel_id }}).then(function(parcel){
            if (parcel) {
                resolve(parcel)
            } else {
                resolve(null);
            }
        }).catch((err) => {
            reject('Something went wrong');
        });
    });
}

insertParcel = function(body) {
    return new Promise((resolve, reject) => {
        models.Parcels.create({
            parcel_id : body.parcel_id,
            from_person_name : body.from_person_name,
            to_person_name : body.to_person_name,
            color : body.color,
            weight : body.weight,
            status : body.status,
            service_price : body.service_price,
            dispatched_on : body.dispatched_on,
            expected_delivery : body.expected_delivery,
            sender_address : body.sender_address,
            receiver_address : body.receiver_address,
            sender_phone_no : body.sender_phone_no,
            receiver_phone_no : body.receiver_phone_no,
            current_location_lat : body.current_location_lat,
            current_location_long : body.current_location_long
        }).then(function(parcel) {
            resolve(parcel);
        }).catch(function(err) {
            reject("Something went wrong. Couldn't save the data.");
        });
    });
}

module.exports = {
    getSingleParcel: getSingleParcel,
    getAllParcels: getAllParcels,
    updateParcel: updateParcel,
    deleteParcel: deleteParcel,
    insertParcel: insertParcel
}

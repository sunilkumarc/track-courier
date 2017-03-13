"use strict"

module.exports = function(sequelize, DataTypes) {
    var Parcels = sequelize.define("Parcels", {
        parcel_id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        from_person_name: {
            type: DataTypes.STRING
        },
        to_person_name: {
            type: DataTypes.STRING
        },
        color: {
            type: DataTypes.STRING
        },
        weight: {
            type: DataTypes.FLOAT
        },
        status: {
            type: DataTypes.STRING
        },
        service_price: {
            type: DataTypes.FLOAT
        },
        dispatched_on: {
            type: DataTypes.STRING
        },
        expected_delivery: {
            type: DataTypes.STRING
        },
        sender_address: {
            type: DataTypes.STRING
        },
        receiver_address: {
            type: DataTypes.STRING
        },
        current_location_lat: {
            type: DataTypes.STRING
        },
        current_location_long: {
            type: DataTypes.STRING
        },
        sender_phone_no: {
            type: DataTypes.STRING
        },
        receiver_phone_no: {
            type: DataTypes.STRING
        }
    }, {
       tableName: 'parcels'
    });

    return Parcels;
}

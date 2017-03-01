var models = require('../models');

getSingleParcel = function(parcel_id) {
    console.log('Inside actual getSingleParcel()');
    return new Promise((resolve, reject) => {
        models.Parcels.findOne({ where: { parcel_id: parcel_id }}).then(function(parcel) {
            if (parcel) {
                resolve(parcel);
            } else
                reject('Couldn\'t find the parcel');
        }).catch(function(err) {
            reject('500 - Something went wrong');
        });
    });
}

module.exports = {
    getSingleParcel: getSingleParcel
}

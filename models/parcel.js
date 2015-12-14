var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParcelSchema = new Schema({
	name: String,
	price: Number,
	color: String,
	from: String,
	to: String,
	vendor: String,
	dispatched_on: String,
	weight: Number,
	current_location: {
		lattitude: String,
		longitude: String
	},
	img_url: String
}, { collection: 'parcel' });

module.exports = mongoose.model('blah', ParcelSchema);

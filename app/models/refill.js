var mongodb = require('../tools/mongodb.js');
var crypto = require('crypto');

var Schema = mongodb.schema;
var mongo = mongodb.mongo;

var _ = require('underscore');

var RefillSchema = new Schema({
	date: { type: Date, default: Date.now, required: true },
	
	distance: { type: Number, default: 0, required: true },
	mileage: { type: Number, default: 0, required: true },
	
	volume: { type: Number, default: 0, required: true },
	
	total: { type: Number, default: 0, required: true },
	cost: { type: Number, default: 0, required: true },
	
	user: { type: Schema.ObjectId, ref: 'User' }
});

RefillSchema.methods = {
};

RefillSchema.statics = {
	load: function (id, cb) {
		this.findOne({ _id: id })
			.populate('user', 'name email username')
			.exec(cb);
	},

	list: function (options, cb) {
		var criteria = options.criteria || {};

		this.find(criteria)
			.populate('user', 'name username')
			.sort({ 'date': -1 }) // sort by date
			.limit(options.perPage)
			.skip(options.perPage * options.page)
			.exec(cb);
	}
};

var model;

if (mongo.models.Refill) {
	model = mongo.model('Refill');
} else {
	model = mongo.model('Refill', RefillSchema);
}
module.exports = model;

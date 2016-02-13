var mongodb = require('../tools/mongodb.js');
var crypto = require('crypto');

var Schema = mongodb.schema;
var mongo = mongodb.mongo;

var _ = require('underscore');

var schema = new Schema({
	date: { type: Date, default: Date.now, required: true },
	mileage: { type: Number, default: 0, required: true },
	volume: { type: Number, default: 0, required: true },
	total: { type: Number, default: 0, required: true },
	user: { type: Schema.ObjectId, ref: 'User', required: true }
});

schema.methods = {
};

schema.statics = {
	load: function (id, cb) {
		this.findOne({ _id: id })
			.populate('user', 'email username phone')
			.exec(cb);
	},

	list: function (options, cb) {
		var criteria = options.criteria || {};

		this.find(criteria)
			.populate('user', 'email username phone')
			.sort({ 'date': -1 })
			.limit(options.perPage)
			.skip(options.perPage * options.page)
			.exec(cb);
	}
};

var model;

if (mongo.models.Refill) {
	model = mongo.model('Refill');
} else {
	model = mongo.model('Refill', schema);
}

module.exports = model;
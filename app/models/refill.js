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
	title: { type: String, default: '', trim: true },
	body: { type: String, default: '', trim: true },
	user: { type: Schema.ObjectId, ref: 'User' }
});

RefillSchema.path('title').required(true, 'Article title cannot be blank');
RefillSchema.path('body').required(true, 'Article body cannot be blank');

RefillSchema.pre('remove', function (next) {
	next();
});

RefillSchema.methods = {
	addComment: function (user, comment, cb) {
		var notify = require('../mailer');

		this.comments.push({
			body: comment.body,
			user: user._id
		});

		if (!this.user.email) this.user.email = 'email@product.com';
		notify.comment({
			article: this,
			currentUser: user,
			comment: comment.body
		});

		this.save(cb);
	},

	removeComment: function (commentId, cb) {
		var index = _.indexof(this.comments, { id: commentId });
		if (~index) this.comments.splice(index, 1);
		else return cb('not found');
		this.save(cb);
	}
};

RefillSchema.statics = {
	load: function (id, cb) {
		this.findOne({ _id: id })
			.populate('user', 'name email username')
			.populate('comments.user')
			.exec(cb);
	},

	list: function (options, cb) {
		var criteria = options.criteria || {};

		this.find(criteria)
			.populate('user', 'name username')
			.sort({ 'createdAt': -1 }) // sort by date
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

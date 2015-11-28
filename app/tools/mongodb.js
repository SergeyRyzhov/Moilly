
var logger = require("./logger.js")('mongodb'),
	mongoose = require('mongoose'),
	config = require('./config.js');

mongoose.connect(config.get('mongoose:uri'));

var db = mongoose.connection;

db.on('error', function (err) {
	logger.error('Connection error:', err.message);
});

db.once('open', function () {
	logger.info("Connected to DB!");
});

var schema = mongoose.Schema;

module.exports = {
	mongo: mongoose,
	schema: schema
};

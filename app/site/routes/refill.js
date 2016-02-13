function init(router) {
	var constants = require('../constants/index');
	var settings = require('../tools/settings');

	var authenticator = require('../tools/authenticator');
	var logger = require('../tools/logger')('RefillRouter');
	var _ = require('underscore');

	var refillModel = require('../models/refill');
	//var userModel = require('../models/user');

	router.get('/api/refill', authenticator.midleware, function (req, res, next) {
		refillModel.list({ criteria: { user: req.user._id } }, function (err, refills) {
			res.send({
				message: err,
				refills: refills,
				success: !err
			})
		});
	});

	router.post('/api/refill', authenticator.midleware, function (req, res, next) {
		var postData = req.body.refills;
		var errors = [];
		logger.debug(postData);

		_.each(postData, function (refill) {
			refillModel.create({
				date: refill.date,
				mileage: refill.mileage,
				volume: refill.volume,
				total: refill.total,
				user: req.user._id
			}, function (err, refill) {
				//logger.debug(refill);
				if (err) {
					logger.error(err);
					errors.push(err);
				}
			});
		});

		res.send({
			message: errors,
			refills: postData,
			success: errors.length == 0
		});
	});

	router.post('/api/refill/delete', authenticator.midleware, function (req, res, next) {
		logger.debug(req.body);

		refillModel.find({ _id: req.body.id }).remove(function (err) {
			if (err) {
				logger.error(err);
			}
			
			res.send({
				message: err,
				deletedId: req.body.id,
				success: !!err
			});
		});
	});

	router.post('/refill/add', function (req, res, next) {
		refillModel.create({
			date: req.body.date,
			mileage: req.body.mileage,
			volume: req.body.volume,
			total: req.body.total,
			user: req.user._id
		}, function (err, refill) {
			var success = false;
			var message = '';

			if (!err) {
				success = true;
			}
			else {
				message = err;
			}

			if (success)
				res.redirect('/');
			else
				res.send({
					message: message,
					refill: refill,
					success: success
				});
		});
	});
}
module.exports = { init: init };
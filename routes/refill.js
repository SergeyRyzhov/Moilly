function init(router) {
	var constants = require('../app/constants/index');
	var settings = require('../app/tools/settings');

	var authenticator = require('../app/tools/authenticator');
	var logger = require('../app/tools/logger')('AuthRouter');
	var _ = require('underscore');

	var refillModel = require('../app/models/refill');
	var userModel = require('../app/models/user');

	router.get('/api/refill', authenticator.midleware, function (req, res, next) {
		refillModel.find({}, function (err, refills) {
			res.send({
				message: err,
				refills: refills,
				success: !err
			})
		});
	});

	router.all('/api/refill/:culture/:action', authenticator.midleware, function (req, res, next) {
		res.send(req.user);
	});

	router.post('/refill/add', function (req, res, next) {
		userModel.findOne(
			{ username: req.user.username }, function (err, user) {
				refillModel.create({
					date: req.body.date,
					mileage: req.body.mileage,
					volume: req.body.volume,
					total: req.body.total,
					user: user._id
				}, function (err, refill) {
					var success = false;
					var message = '';

					if (!err) {
						//if (user.authenticate(req.body.password)) {
						/*var publicModel = {
							username: user.username,
							email: user.email,
							phone: user.phone,
							isAuthenticated: true
						};

						authenticator.sign(res, publicModel);
						*/
						success = true;
						//}
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

	});
}
module.exports = { init: init };
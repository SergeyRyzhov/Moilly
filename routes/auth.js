function init(router) {
	var constants = require('../app/constants/index');
	var settings = require('../app/tools/settings');
	var logger = require('../app/tools/logger')('AuthRouter');
	var authenticator = require('../app/tools/authenticator');
	var _ = require('underscore');

	var userModel = require('../app/models/user');

	router.post('/auth/signin', function (req, res, next) {
		userModel.findOne({
			$or: [
				{ username: req.body.login },
				{ email: req.body.login },
				{ phone: req.body.login }
			]
		}, function (err, user) {
			var success = false;
			var message = '';

			if (!err) {
				if (user.authenticate(req.body.password)) {
					var publicModel = {
						username: user.username,
						email: user.email,
						phone: user.phone,
						isAuthenticated: true
					};

					authenticator.sign(res, publicModel);
				}
			}
			else {
				message = err;
			}

			res.send({
				message: message,
				user: publicModel,
				success: success
			});
		});
	});

	router.post('/auth/signup', function (req, res, next) {
		var user = userModel.create({
			username: req.body.username,
			email: req.body.email,
			phone: req.body.phone,
			password: req.body.password,
		});

		user.save(function (err, user) {
			var success = false;
			var message = '';

			if (!err) {
				if (user.authenticate(req.body.password)) {
					var publicModel = {
						username: user.username,
						email: user.email,
						phone: user.phone,
						isAuthenticated: true
					};

					authenticator.sign(res, publicModel);
				}
			}
			else {
				message = err;
			}

			res.send({
				message: message,
				user: publicModel,
				success: success
			});
		});
	});
}
module.exports = { init: init };

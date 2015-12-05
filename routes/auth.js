function init(router) {
	var constants = require('../app/constants/index');
	var settings = require('../app/tools/settings');
	var logger = require('../app/tools/logger')('AuthRouter');
	var authenticator = require('../app/tools/authenticator');
	var _ = require('underscore');

	router.post('/auth/signin', function (req, res, next) {
		var data = _.clone(req.body);
		delete data.password;

		var user = data;
		user.isAuthenticated = true;

		authenticator.sign(res, user);

		res.send({
			user: user,
			success: true
		});
	});

	router.post('/auth/signup', function (req, res, next) {
		var data = _.clone(req.body);
		delete data.password;

		var user = data;
		user.isAuthenticated = true;

		authenticator.sign(res, user);

		res.send({
			user: user,
			success: true
		});
	});
}
module.exports = { init: init };

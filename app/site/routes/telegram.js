function init(router) {
	var constants = require('../constants/index');
	var settings = require('../tools/settings');
	var logger = require('../tools/logger')('AuthRouter');
	var authenticator = require('../tools/authenticator');
	var _ = require('underscore');

	var userModel = require('../models/user');
	var tokenModel = require('../models/token');

	router.get('/api/telegram/token', authenticator.midleware, function (req, res, next) {
		tokenModel.createFor(req.user, function (err, token) {
			res.send({ token: token.token });
		});
	});
}
module.exports = { init: init };

function init(router) {
	var constants = require('../app/constants/index');
	var settings = require('../app/tools/settings');
	var logger = require('../app/tools/logger')('AuthRouter');
	var authenticator = require('../app/tools/authenticator');
	var _ = require('underscore');

	var userModel = require('../app/models/user');
	var tokenModel = require('../app/models/token');

	router.get('/api/telegram/token', authenticator.midleware, function (req, res, next) {
		tokenModel.createFor(req.user, function (err, token) {
			res.send({ token: token.token });
		});
	});
}
module.exports = { init: init };

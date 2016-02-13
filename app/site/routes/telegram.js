function init(router) {
	var authenticator = require('../tools/authenticator');
	var tokenModel = require(__common + '/models/token');

	router.get('/api/telegram/token', authenticator.midleware, function (req, res, next) {
		tokenModel.createFor(req.user, function (err, token) {
			res.send({ token: token.token });
		});
	});
}
module.exports = { init: init };

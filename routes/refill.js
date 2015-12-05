function init(router) {
	var constants = require('../app/constants/index');
	var settings = require('../app/tools/settings');
	
	var authenticator = require('../app/tools/authenticator');

	router.all('/api/refill/:culture/:action', authenticator.midleware, function (req, res, next) {
		res.send(req.user);
	});
}
module.exports = { init: init };
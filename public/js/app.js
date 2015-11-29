define([
	'underscore',
	'knockout',
	'utils',
	'storage',
	'constants',
	'amplify',
	'navigator'
], function (_, ko, utils, storage, constants, amplify, navigator) {
	console.info('Moilly loaded.');
	console.debug('KO', ko);
	console.debug('Underscore', _);

	var user = { isAnonymous: true };
	var page = ko.observable(utils.purl.attr('fragment'));

	function initialize() {

		amplify.subscribe(constants.events.navigation.page, page);

		navigator.registerMenu(['account', 'cars', 'stats', 'about']);

		ko.applyBindings({
			page: page,
			user: user
		});
		setTimeout(componentHandler.upgradeDom, constants.common.bindingTimeout);
	}

	setTimeout(initialize, 0);
});
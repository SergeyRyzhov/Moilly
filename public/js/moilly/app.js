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
	var needauth = ko.pureComputed(function () {
		return _.contains(constants.common.authpaths, page()) && user.isAnonymous;
	});

	function initialize() {
		amplify.subscribe(constants.events.navigation.page, page);

		navigator.registerMenu(['account', 'cars', 'stats', 'about'])
	}
	
	initialize();
	
	ko.applyBindings({
		page: page,
		needauth: needauth
	});

	setTimeout(componentHandler.upgradeDom, 500);
});
define([
	'underscore',
	'knockout',
	'utils',
	'storage',
	'constants',
	'amplify'
], function (_, ko, utils, storage, constants, amplify) {
	var user = { isAnonymous: true };
	var page = ko.observable(utils.purl.attr('fragment'));

	function initialize() {

		amplify.subscribe(constants.events.navigation.page, page);

		ko.applyBindings({
			page: page,
			user: user
		});
	}

	setTimeout(initialize, 0);
});
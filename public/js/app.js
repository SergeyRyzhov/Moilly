define([
	'underscore',
	'knockout',
	'utils',
	'storage',
	'constants',
	'amplify'
], function (_, ko, utils, storage, constants, amplify) {
	var user = ko.observable({ isAnonymous: true });
	var page = ko.observable(utils.purl.attr('fragment'));

	function initialize() {
		amplify.subscribe(constants.events.navigation.page, page);
		amplify.subscribe(constants.events.user.changed, user);

		//amplify.publish(constants.events.user.required);

		ko.applyBindings({
			page: page,
			user: user
		});
	}

	function dispose() {
		amplify.unsubscribe(constants.events.navigation.page, page);
		amplify.unsubscribe(constants.events.user.changed, user);
	}
	
	setTimeout(initialize, 0);
});
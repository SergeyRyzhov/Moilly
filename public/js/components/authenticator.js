define([
	'knockout',
	'underscore',
	'storage',
	'constants',
	'localization',
	'amplify'
], function (ko, _, storage, constants, localization, amplify) {
	'use strict';

	return function (params) {
		var user = params.user;

		function publishUser() {
			amplify.publish(constants.events.user.changed, user);
		}

		function initialize() {
			//amplify.subscribe(constants.events.user.required, publishUser);
		}

		function dispose() {
			//amplify.unsubscribe(constants.events.user.required, publishUser);
		}
publishUser();
		initialize();
		return {
			dispose: dispose
		};
	};
});
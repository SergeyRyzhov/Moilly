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
		var user = params;

		function initialize() {
			amplify.publish(constants.events.user.changed, user);
		}

		function dispose() {
		}

		initialize();
		return {
			dispose: dispose
		};
	};
});
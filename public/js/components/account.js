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
		return {
			needAuth: ko.pureComputed(function () {
				var usr = user();
				return !usr || !usr.isAuthenticated;
			})
		}
	};
});
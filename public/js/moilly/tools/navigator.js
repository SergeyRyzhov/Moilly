define([
	'underscore',
	'constants',
	'utils',
	'storage',
	'sammy',
	'amplify'
], function (_, constants, utils, storage, sammy, amplify) {
	'use strict';

	function registerMenuPaths(paths) {
		var menu = sammy(function () {
			var app = this;
			_.each(paths, function (path) {
				app.get('#' + path, function () {
					amplify.publish(constants.events.navigation.page, path);
				});
			});
		});
		menu.run();
	}

	return {
		registerMenu: registerMenuPaths
	};
});
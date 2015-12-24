define([
	'knockout',
	'underscore',
	'storage',
	'constants',
	'localization',
	'utils',
	'navigator'
], function (ko, _, storage, constants, localization, utils, navigator) {
	'use strict';
	
	return function (params) {
		navigator.upgradeDom();
		navigator.registerMenu(_.keys(params));
		navigator.registerMenu(['refill', 'refill-bulk']);
		return {
			menu: utils.toObjectArray(params, 'link', 'title'),
			anchor: function(id) { return '#' + id; }
		}
	};
});
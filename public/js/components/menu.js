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
		navigator.registerMenu(_.keys(params));
		return {
			menu: utils.toObjectArray(params, 'link', 'title'),
			anchor: function(id) { return '#' + id; }
		}
	};
});
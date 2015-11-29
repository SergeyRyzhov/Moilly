define([
	'knockout',
	'underscore',
	'storage',
	'constants',
	'localization',
	'utils'
], function (ko, _, storage, constants, localization, utils) {
	'use strict';

	return function (params) {
		return {
			languages: utils.toObjectArray(params, 'link', 'title')
		}
	};
});
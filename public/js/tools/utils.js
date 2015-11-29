define([
	'underscore',
	'purl'
], function (_, purl) {
	'use strict';

	function toObjectArray(obj, keyName, valueName) {
		return _.map(_.pairs(obj), function (pair) {
			return _.object([keyName || 'key', valueName || 'value'], pair);
		});;
	}

	return {
		toObjectArray: toObjectArray,
		purl: purl(window.location)
	};
});
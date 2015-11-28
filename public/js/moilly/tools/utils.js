define([
	'underscore',
	'purl'
], function (_, purl) {
	'use strict';

	return {
		purl: purl(window.location)
	};
});
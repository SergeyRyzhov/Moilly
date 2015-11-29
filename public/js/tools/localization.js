define([
	'underscore',
	'constants',
	'utils',
	'storage'
], function (_, constants, utils, storage) {
	'use strict';
	
	var culture = utils.purl.segment(1);
	var userCulture = storage.cookie.get(constants.keys.culture);
	
	if(culture != userCulture); 
		storage.cookie.set(constants.keys.culture, culture);
		
	return {
		culture: culture
	};
});
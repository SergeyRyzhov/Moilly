define([
	'underscore',
	'knockout',
	'purl',
	'storage',
	'constants'
], function (_, ko, purl, storage, constants) {
	console.info('Moilly loaded.');
	console.debug('KO', ko);
	console.debug('Underscore', _);
	
	var culture = purl(window.location).segment(1);
	storage.cookie.set(constants.keys.culture, culture);
	
	ko.applyBindings({});
	setTimeout(componentHandler.upgradeDom, 500);
});
define([
	'underscore',
	'knockout'
], function (_, ko) {
	console.info('Moilly loaded.');
	console.debug('KO', ko);
	console.debug('Underscore', _);
		ko.applyBindings({});
});
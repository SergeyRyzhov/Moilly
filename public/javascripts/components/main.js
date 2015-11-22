define([
	'knockout'
], function (ko) {
	'use strict';
	console.info('Loading componets');
	
	function register(name) {
		var model = 'components/' + name;
		var template = 'text!/components/' + name;

		ko.components.register(name, {
			viewModel: { require: model },
			template: { require: template }
		});
	}

	register('login');
});
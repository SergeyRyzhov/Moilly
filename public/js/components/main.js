define([
	'knockout',
	'underscore'
], function (ko, _) {
	'use strict';
	console.info('Componets loader initialized');

	var loader = {
		getConfig: function (name, callback) {

			var model = 'components/' + name;
			var template = 'text!/components/' + name;

			callback({
				viewModel: { require: model },
				template: { require: template }
			});
		}
	};

	ko.components.loaders.unshift(loader);
});
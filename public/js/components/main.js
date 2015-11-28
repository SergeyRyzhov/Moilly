define([
	'knockout',
	'underscore',
	'storage',
	'constants',
	'localization'
], function (ko, _, storage, constants, localization) {
	'use strict';
	console.info('Componets loader initialized');

	var loader = {
		getConfig: function (name, callback) {

			var model = 'components/' + name;
			var template = 'text!/' + localization.culture + '/components/' + name;

			callback({
				viewModel: { require: model },
				template: { require: template }
			});
		}
	};

	ko.components.loaders.unshift(loader);
});
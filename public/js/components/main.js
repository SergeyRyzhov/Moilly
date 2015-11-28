define([
	'knockout',
	'underscore',
	'storage',
	'constants'
], function (ko, _, storage, constants) {
	'use strict';
	console.info('Componets loader initialized');



	var loader = {
		getConfig: function (name, callback) {

			var model = 'components/' + name;
			var template = 'text!/' + storage.cookie.get(constants.keys.culture) + '/components/' + name;

			callback({
				viewModel: { require: model },
				template: { require: template }
			});
		}
	};

	ko.components.loaders.unshift(loader);
});
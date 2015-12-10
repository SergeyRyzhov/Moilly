define([
	'knockout',
	'underscore',
	'storage',
	'constants',
	'localization',
	'jquery'
], function (ko, _, storage, constants, localization, $) {
	'use strict';

	ko.bindingHandlers.number = {
		init: function (el, valueAccessor, allBindingsAccessor, viewModel) {
			var source = ko.unwrap(valueAccessor());
			if(!source){
				return;
			}
			
			var value = Number(source);
			el.textContent = isNaN(value) ? source : value.toFixed(2);
		}
	};
});
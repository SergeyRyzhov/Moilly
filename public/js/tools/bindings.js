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
			el.textContent = Number(ko.unwrap(valueAccessor())).toFixed(2);
		}
	};
});
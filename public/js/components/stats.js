define([
	'knockout',
	'underscore',
	'storage',
	'constants',
	'localization',
	'amplify'
], function (ko, _, storage, constants, localization, amplify) {
	'use strict';

	return function (params) {
		var refills = ko.observableArray();


		var refillsText = ko.pureComputed(function () {
			return ko.toJSON(refills);
		});

		amplify.request.define("refill.list", "ajax", {
			url: "/api/refill",
			dataType: "json",
			type: "GET",
			cache: false
		});

		amplify.request('refill.list', {}, function (res) {
			refills(res.refills);
		});

		return {
			refills: refills,
			refillsText: refillsText
		}
	};
});
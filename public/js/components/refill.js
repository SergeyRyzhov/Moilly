define([
	'knockout',
	'underscore',
	'storage',
	'constants',
	'localization'
], function (ko, _, storage, constants, localization) {
	'use strict';

	return function (params) {
		var date = ko.observable(new Date());
		var distance = ko.observable(0);
		var volume = ko.observable(0);
		var total = ko.observable(0);

		var period = ko.pureComputed(function () {
			return '1 неделя';
		});

		var mileage = ko.pureComputed(function () {
			return 100000 + distance();
		});

		var consumption = ko.pureComputed(function () {
			return volume() / (distance() || 1);
		});

		var cost = ko.pureComputed(function () {
			return total() / (volume() || 1);
		});

		return {
			date: date,
			distance: distance,
			volume: volume,
			total: total,
			period: period,
			mileage: mileage,
			consumption: consumption,
			cost: cost
		};
	};
});
define([
	'knockout',
	'underscore',
	'storage',
	'constants',
	'localization',
	'moment'
], function (ko, _, storage, constants, localization, moment) {
	'use strict';
		
	return function (params) {
		var date = ko.observable(moment().format('YYYY-MM-DD'));
		var mileage = ko.observable(0);
		var volume = ko.observable(0);
		var total = ko.observable(0);

		var period = ko.pureComputed(function () {
			return '1 неделя';
		});

		var distance = ko.pureComputed(function () {
			return 100000 + mileage();
		});

		var consumption = ko.pureComputed(function () {
			return volume() / (mileage() || 1) * 100;
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
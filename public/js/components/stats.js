define([
	'knockout',
	'underscore',
	'storage',
	'constants',
	'localization',
	'amplify',
	'moment'
], function (ko, _, storage, constants, localization, amplify, moment) {
	'use strict';

	function refillViewModel(all, rawRefill) {
		function summedDistance(refills, from, to) {
			return _.reduce(_.filter(refills,
				function (refill) {
					return refill.date < to;
				}),
				function (memo, refill) {
					return memo + refill.mileage;
				}, 0);
		}

		function summedVolume(refills, from, to) {
			return _.reduce(_.filter(refills,
				function (refill) {
					return refill.date < to;
				}),
				function (memo, refill) {
					return memo + refill.volume;
				}, 0);
		}

		var date = ko.observable(moment(rawRefill.date).format('YYYY-MM-DD'));
		var mileage = ko.observable(rawRefill.mileage);
		var volume = ko.observable(rawRefill.volume);
		var total = ko.observable(rawRefill.total);

		var period = ko.pureComputed(function () {
			return '1 неделя';
		});

		var distanceBefore = ko.pureComputed(function () {
			return summedDistance(all, '', rawRefill.date);
		});

		var volumeBefore = ko.pureComputed(function () {
			return summedVolume(all, '', rawRefill.date);
		});

		var distance = ko.pureComputed(function () {
			return distanceBefore() + mileage();
		});

		var consumptionCommon = ko.pureComputed(function () {
			return (volumeBefore() / (distanceBefore() || 0) * 100).toFixed(2);
		});

		var consumption = ko.pureComputed(function () {
			return (volume() / (mileage() || 1) * 100).toFixed(2);
		});

		var cost = ko.pureComputed(function () {
			return (total() / (volume() || 1)).toFixed(2);
		});

		return {
			date: date,
			distance: distance,
			volume: volume,
			total: total,
			period: period,
			mileage: mileage,
			consumption: consumption,
			consumptionCommon: consumptionCommon,
			cost: cost
		};
	}
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
			var refillsData = res.refills;
			refills(_.map(refillsData, function (r) {
				return refillViewModel(refillsData, r);
			}));
		});

		return {
			refills: refills,
			refillsText: refillsText
		}
	};
});
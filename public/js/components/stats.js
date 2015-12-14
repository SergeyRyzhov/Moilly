define([
	'knockout',
	'underscore',
	'storage',
	'constants',
	'localization',
	'amplify',
	'moment',
	'responsejs'
], function (ko, _, storage, constants, localization, amplify, moment, responsejs) {
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

		function summedTotal(refills, from, to) {
			return _.reduce(_.filter(refills,
				function (refill) {
					return refill.date < to;
				}),
				function (memo, refill) {
					return memo + refill.total;
				}, 0);
		}

		var date = ko.observable(moment(rawRefill.date).format('YYYY-MM-DD'));
		var mileage = ko.observable(rawRefill.mileage);
		var volume = ko.observable(rawRefill.volume);
		var total = ko.observable(rawRefill.total);

		var commonTotal = ko.pureComputed(function () {
			return summedTotal(all, '', rawRefill.date) + total();
		});


		/*var period = ko.pureComputed(function () {
			return '1 неделя';
		});*/

		var distanceBefore = ko.pureComputed(function () {
			return summedDistance(all, '', rawRefill.date);
		});

		var totalVolume = ko.pureComputed(function () {
			return summedVolume(all, '', rawRefill.date) + volume();
		});

		var distance = ko.pureComputed(function () {
			return distanceBefore() + mileage();
		});

		var commonConsumption = ko.pureComputed(function () {
			return totalVolume() / (distance() || 100) * 100;
		});

		var consumption = ko.pureComputed(function () {
			return volume() / (mileage() || 1) * 100;
		});

		var cost = ko.pureComputed(function () {
			return total() / (volume() || 1);
		});
		var mock = '';
		return {
			date: date,
			mileage: {
				total: distance,
				current: mileage,
				perMonth: mock,
				perQuarter: mock,
				perYear: mock,
				perLiter: mock
			},
			volume: {
				total: totalVolume,
				current: volume,
				perMonth: mock,
				perQuarter: mock,
				perYear: mock
			},
			consumption: {
				total: commonConsumption,
				current: consumption,
				perMonth: mock,
				perQuarter: mock,
				perYear: mock
			},
			price: {
				total: commonTotal,
				current: total,
				perMonth: mock,
				perQuarter: mock,
				perYear: mock,
				perLiter: cost,
				perKilometer: mock
			}
		};
	}

	return function (params) {
		var refills = ko.observableArray();
		var isMobile = ko.observable(false);

		responsejs.action(function () {
			if (responsejs.band(0, 480)) {
				isMobile(true);
			} else {
				isMobile(false);
			}
        });

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
			refillsText: refillsText,
			isMobile: isMobile
		}
	};
});
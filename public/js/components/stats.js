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

	function refillViewModel(refills, rawRefill) {
		function computeSumm(from, to, field) {
			return _.reduce(_.filter(refills,
				function (refill) {
					var now = moment(refill.date);
					return now < to && (!from || now > from);
				}),
				function (memo, refill) {
					return memo + refill[field];
				}, 0);
		}

		var startOfMonth = moment(rawRefill.date).startOf('month');
		var startOfQuarter = moment(rawRefill.date).startOf('quarter');
		var startOfYear = moment(rawRefill.date).startOf('year');

		var date = ko.observable(moment(rawRefill.date).format('dddd, MMMM Do YYYY'));
		// var date = ko.observable(moment(rawRefill.date).calendar());
		var mileage = ko.observable(rawRefill.mileage);
		var volume = ko.observable(rawRefill.volume);
		var total = ko.observable(rawRefill.total);

		function totalPerPeriod(start) {
			return computeSumm(start, moment(rawRefill.date), 'total') + total();
		}

		function volumePerPeriod(start) {
			return computeSumm(start, moment(rawRefill.date), 'volume') + volume();
		}

		function mileagePerPeriod(start) {
			return computeSumm(start, moment(rawRefill.date), 'mileage') + mileage();
		}

		function consumption(vol, mil) {
			return vol / (mil || 100) * 100;
		};

		var cost = ko.pureComputed(function () {
			return total() / (volume() || 1);
		});

		return {
			date: date,
			mileage: {
				total: mileagePerPeriod(),
				current: mileage,
				perMonth: mileagePerPeriod(startOfMonth),
				perQuarter: mileagePerPeriod(startOfQuarter),
				perYear: mileagePerPeriod(startOfYear),
				perLiter: ko.pureComputed(function () {
					return mileagePerPeriod() / volumePerPeriod();
				})
			},
			volume: {
				total: volumePerPeriod(),
				current: volume,
				perMonth: volumePerPeriod(startOfMonth),
				perQuarter: volumePerPeriod(startOfQuarter),
				perYear: volumePerPeriod(startOfYear),
			},
			consumption: {
				total: consumption(volumePerPeriod(), mileagePerPeriod()),
				current: consumption(volume(), mileage()),
				perMonth: consumption(volumePerPeriod(startOfMonth), mileagePerPeriod(startOfMonth)),
				perQuarter: consumption(volumePerPeriod(startOfQuarter), mileagePerPeriod(startOfQuarter)),
				perYear: consumption(volumePerPeriod(startOfYear), mileagePerPeriod(startOfYear))
			},
			price: {
				total: totalPerPeriod(),
				current: total,
				perMonth: totalPerPeriod(startOfMonth),
				perQuarter: totalPerPeriod(startOfQuarter),
				perYear: totalPerPeriod(startOfYear),
				perLiter: cost,
				perKilometer: ko.pureComputed(function () {
					return totalPerPeriod() / mileagePerPeriod();
				})
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
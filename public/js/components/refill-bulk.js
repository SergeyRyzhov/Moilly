define([
  'knockout',
  'underscore',
  'storage',
  'constants',
  'localization',
  'moment'
], function (ko, _, storage, constants, localization, moment) {
  'use strict';

  function refillModel(params) {
    var date = ko.observable(moment().format('YYYY-MM-DD'));
    var mileage = ko.observable(0);
    var volume = ko.observable(0);
    var total = ko.observable(0);

    return {
      date: date,
      volume: volume,
      total: total,
      mileage: mileage
    };
  };

  return function (params) {
    var refills = ko.observableArray([refillModel()]);

    function add() {
      refills.push(refillModel());
    }

    function submit() {
      refills([refillModel()]);
    }

    return {
      refills: refills,
      add: add,
      submit:submit
    }
  }
});
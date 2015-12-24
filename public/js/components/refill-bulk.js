define([
  'knockout',
  'amplify',
  'underscore',
  'storage',
  'constants',
  'localization',
  'moment'
], function (ko, amplify, _, storage, constants, localization, moment) {
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

    amplify.request.define("refill.submit", "ajax", {
      url: "/api/refill",
      type: 'POST',
      dataType: 'json',
      traditional: true,
      contentType: 'application/json; charset=utf-8'
    });

    function add() {
      refills.push(refillModel());
    }

    function submit() {
      amplify.request("refill.submit",
        ko.toJSON({
          refills: refills
        }),
        function (data) {
          console.debug(data);
          refills([refillModel()]);
        });
    }

    return {
      refills: refills,
      add: add,
      submit: submit
    }
  }
});
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
      var lRefill = refills.slice(-1)[0];
      var nRefill = refillModel();
      nRefill.date(lRefill.date());
      refills.push(nRefill);
    }

    function submit() {
      amplify.request("refill.submit",
        ko.toJSON({
          refills: refills
        }),
        function (data) {
          console.debug(data);
          var lRefill = refills.slice(-1)[0];
          var nRefill = refillModel();
          nRefill.date(lRefill.date());
          refills([nRefill]);
        });
    }

    return {
      refills: refills,
      add: add,
      submit: submit
    }
  }
});
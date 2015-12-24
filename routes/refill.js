function init(router) {
  var constants = require('../app/constants/index');
  var settings = require('../app/tools/settings');

  var authenticator = require('../app/tools/authenticator');
  var logger = require('../app/tools/logger')('AuthRouter');
  var _ = require('underscore');

  var refillModel = require('../app/models/refill');
  //var userModel = require('../app/models/user');

  router.get('/api/refill', authenticator.midleware, function (req, res, next) {
    refillModel.list({ criteria: { user: req.user._id } }, function (err, refills) {
      res.send({
        message: err,
        refills: refills,
        success: !err
      })
    });
  });

  router.post('/api/refill', authenticator.midleware, function (req, res, next) {
    var postData = req.body.refills;
    var errors = [];

    _.each(postData, function (memo, refill) {
      refillModel.create({
        date: refill.date,
        mileage: refill.mileage,
        volume: refill.volume,
        total: refill.total,
        user: req.user._id
      }, function (err, refill) {
        if (err)
          errors.push(err);
      });
    });

    res.send({
      message: errors,
      refills: postData,
      success: errors.length == 0
    });
  });

  router.post('/api/refill/delete', authenticator.midleware, function (req, res, next) {
    refillModel.find({ _id: req.body.id }).remove(function () {
      res.redirect('/');
    });
  });

  router.all('/api/refill/:culture/:action', authenticator.midleware, function (req, res, next) {
    res.send(req.user);
  });

  router.post('/refill/add', function (req, res, next) {
    refillModel.create({
      date: req.body.date,
      mileage: req.body.mileage,
      volume: req.body.volume,
      total: req.body.total,
      user: req.user._id
    }, function (err, refill) {
      var success = false;
      var message = '';

      if (!err) {
        success = true;
      }
      else {
        message = err;
      }

      if (success)
        res.redirect('/');
      else
        res.send({
          message: message,
          refill: refill,
          success: success
        });
    });
  });
}
module.exports = { init: init };
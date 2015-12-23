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

  router.post('/api/refill', function (req, res, next) {
    var postData = req.body.refills;
    _.each(postData, function (refill) {
      refillModel.create({
        date: refill.date,
        mileage: refill.mileage,
        volume: refill.volume,
        total: refill.total,
        user: req.user._id
      });
    });

    res.send({
      message: '',
      refills: postData,
      success: true
    });
  });

  router.post('/api/refill/:id/:action', authenticator.midleware, function (req, res, next) {
    // refillModel.list({ user: req.user._id }, function (err, refills) {
    // 	res.send({
    // 		message: err,
    // 		refills: refills,
    // 		success: !err
    // 	})
    // });
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
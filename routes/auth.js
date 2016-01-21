function init(router) {
  var constants = require('../app/constants/index');
  var settings = require('../app/tools/settings');
  var logger = require('../app/tools/logger')('AuthRouter');
  var authenticator = require('../app/tools/authenticator');
  var _ = require('underscore');

  var userModel = require('../app/models/user');

  router.post('/auth/password', function (req, res, next) {
    userModel.findOne({
      _id: req.user._id
    }, function (err, user) {

      var success = false;
      var message = '';

      if (!err) {

        if (req.body.newPassword == req.body.newPassword2) {

          if (user.authenticate(req.body.oldPassword)) {
            user.password = req.body.newPassword;
            user.save(function () {
            });
            success = true;
          }
        }
      }
      else {
        message = err;
      }

      if (success)
        res.redirect('/');
      else
        res.send({
          message: message,
          success: success
        });
    });
  });

  router.post('/auth/signin', function (req, res, next) {
    userModel.findOne({
      $or: [
        { username: req.body.login },
        { email: req.body.login },
        { phone: req.body.login }
      ]
    }, function (err, user) {
      var success = false;
      var message = '';

      if (!err && user) {
        if (user.authenticate(req.body.password)) {
          var publicModel = {
            _id: user._id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            isAuthenticated: true
          };

          authenticator.sign(res, publicModel);
          success = true;
        }
      }
      else {
        message = err;
      }

      if (success)
        res.redirect('/');
      else
        res.send({
          message: message,
          user: publicModel,
          success: success
        });
    });
  });

  router.post('/auth/signup', function (req, res, next) {
    userModel.create({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    }, function (err, user) {
      var success = false;
      var message = '';

      if (!err) {
        if (user.authenticate(req.body.password)) {
          var publicModel = {
            username: user.username,
            email: user.email,
            phone: user.phone,
            isAuthenticated: true
          };

          authenticator.sign(res, publicModel);
          success = true;
        }
      }
      else {
        message = err;
      }

      if (success)
        res.redirect('/');
      else
        res.send({
          message: message,
          user: publicModel,
          success: success
        });
    });
  });

  router.post('/auth/logout', function (req, res, next) {
    authenticator.logout(res);
    res.redirect('/');
  });
}
module.exports = { init: init };

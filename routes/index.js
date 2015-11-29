var express = require('express');
var router = express.Router();

var constants = require('../app/constants/index');
var settings = require('../app/tools/settings');

router.get('/:culture', function (req, res, next) {
  if (constants.labels.hasCulture(req.params.culture))
    res.render('index', settings.default(req));
  else
    res.redirect('/' + constants.settings.common.defaultCulture);
});

router.get('/', function (req, res, next) {
  res.redirect('/' + constants.settings.common.defaultCulture);
});

router.get('/:culture/components/:name', function (req, res, next) {
  //console.log(req.params);
  if (constants.labels.hasCulture(req.params.culture)) {
    console.log('c');
    res.render('components/' + req.params.name, settings.default(req));
  }
  else {
    console.log('e');
    res.render('components/error', settings.default(req));
  }
});

module.exports = router;

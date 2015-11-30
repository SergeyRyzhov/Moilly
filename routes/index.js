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
  console.log(req.cookies);
  if (req.cookies.culture)
    res.redirect('/' + req.cookies.culture);
  else
    res.redirect('/' + constants.settings.common.defaultCulture);
});

router.get('/:culture/components/:name', function (req, res, next) {
  if (constants.labels.hasCulture(req.params.culture))
    res.render('components/' + req.params.name, settings.default(req));
  else
    res.render('components/error', settings.default(req));
});

module.exports = router;

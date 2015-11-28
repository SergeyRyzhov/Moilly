var express = require('express');
var router = express.Router();

var constants = require('../app/constants/index');

function getSettings(req) {
  return {
    culture: req.params.culture,
    labels: constants.labels.load(req.params.culture)
  };
}

router.get('/:culture', function (req, res, next) {
  if (constants.labels.hasCulture(req.params.culture))
    res.render('index', getSettings(req));
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
    res.render('components/' + req.params.name, getSettings(req));
  }
  else {
    console.log('e');
    res.render('components/error', getSettings(req));
  }
});

module.exports = router;

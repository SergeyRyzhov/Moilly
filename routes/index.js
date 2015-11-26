var express = require('express');
var router = express.Router();

var constants = require('../app/constants/index');

function getSettings(req) {
  var get = function (name) {
    return constants.labels.get(name, req.params.culture)
  }

  return {
    culture: req.params.culture,
    
    site: get('site'),
    menu: get('menu'),
    search: get('search'),
    auth: get('auth')
  };
}

/* GET app page. */
router.get('/:culture', function (req, res, next) {
  if (constants.labels.hasCulture(req.params.culture))
    res.render('index', getSettings(req));
  else
    res.redirect('/' + constants.settings.common.defaultCulture);
});

router.get('/', function (req, res, next) {
  res.redirect('/' + constants.settings.common.defaultCulture);
});

router.get('/components/:name', function (req, res, next) {
  //if (constants.labels.hasCulture(req.params.culture))
  res.render('components/' + req.params.name, getSettings(req));
  //else
  //res.redirect('/' + constants.settings.common.defaultCulture);
});

module.exports = router;

var express = require('express');
var router = express.Router();

var constants = require('../app/constants/index');

/* GET app page. */
router.get('/:culture', function (req, res, next) {
  if (constants.labels.hasCulture(req.params.culture))
    res.render('index', { title: constants.labels.get('siteTitle', req.params.culture) });
  else
    res.redirect('/' + constants.settings.common.defaultCulture);
});

router.get('/', function (req, res, next) {
  res.redirect('/' + constants.settings.common.defaultCulture);
});

module.exports = router;

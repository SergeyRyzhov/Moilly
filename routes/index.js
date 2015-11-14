var express = require('express');
var router = express.Router();

var constants = require('../app/constants/index');

/* GET home page. */
router.get('/:culture', function (req, res, next) {
  res.render('index', { title: constants.labels.get('siteTitle', req.params.culture) });
});

router.get('/',function (req, res, next) {
  res.redirect('/' + constants.settings.common.defaultCulture);
});

module.exports = router;

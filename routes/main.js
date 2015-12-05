function init(router) {
  var constants = require('../app/constants/index');
  var settings = require('../app/tools/settings');

	var authenticator = require('../app/tools/authenticator');
  

  router.get('/:culture', authenticator.midleware, function (req, res, next) {
    if (constants.labels.hasCulture(req.params.culture))
      res.render('index', settings.extended(req, { user: req.user || anonymous }));
    else
      res.redirect('/' + constants.settings.common.defaultCulture);
  });

  router.get('/', function (req, res, next) {
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
}
module.exports = { init: init };

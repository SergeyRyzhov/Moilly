var settings = require('../settings/index');
var _ = require('underscore');
var utils = require('../../tools/utils');
var cultures = {};


function initialize() {
	function loadLabels(cultures) {
		var defaultLabels = require('./default.json');

		return _.object(_.map(cultures, function (culture) {
			return [culture, utils.merge(require('./' + culture + '.json'), defaultLabels)];
		}));
	}

	cultures = loadLabels(['ru', 'en']);
}

function load(culture) {
	culture = correctCulture(culture);
	var labels = cultures[culture];
	//console.log(labels);
	return labels;
}

function correctCulture(culture) {
	culture = culture || settings.common.defaultCulture;
	if (!cultures[culture]) {
		culture = settings.common.defaultCulture;
	}
	return culture;
}

initialize();

module.exports = {
	load: load,
	hasCulture: function (c) { return correctCulture(c) === c }
};

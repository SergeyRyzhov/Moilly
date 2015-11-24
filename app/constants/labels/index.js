var settings = require('../settings/index');
var _ = require('underscore');
var utils = require('../../tools/utils');
var cultures = {};


function initialize(){	 
	function loadLabels(cultures){		
		var defaultLabels = require('./default.json');
		
		return _.object( _.map(cultures, function(culture) {			
			return [culture, utils.merge(require('./'+culture+'.json'), defaultLabels)];
		}));
	}
	
	cultures = loadLabels(['ru', 'en']);
}

function readLabel(name, culture) {
	culture = correctCulture(culture);
	return cultures[culture][name] || getDefault(name, culture);
}

function correctCulture(culture) {
	culture = culture || settings.common.defaultCulture;
	if (!cultures[culture]) {
		culture = settings.common.defaultCulture;
	}
	return culture;
}

function getDefault(name, culture) {
	culture = culture || settings.common.defaultCulture;
	return 'No label named ' + name + ' of culture ' + culture;
}

initialize();

module.exports = {
	get: readLabel,
	hasCulture: function (c) { return correctCulture(c) === c }
};

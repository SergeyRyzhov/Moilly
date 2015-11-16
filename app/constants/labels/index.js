var settings = require('../settings/index');
var _ = require('underscore');
var cultures = {
	ru: require('./ru.json'),
	en: require('./en.json')
};

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

module.exports = {
	get: readLabel,
	hasCulture: function (c) { return correctCulture(c) === c }
};

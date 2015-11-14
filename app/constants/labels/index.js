var settings = require('../settings/index');

function readLabel(name, culture) {
	culture = culture || settings.common.defaultCulture;
	return this[culture][name] || getDefault(name, culture);
}

function getDefault(name, culture) {
	culture = culture || settings.common.defaultCulture;
	return 'No label named ' + name + ' of culture ' + culture;
}

module.exports = {
	ru: require('./ru.js'),
	en: require('./en.js'),

	get: readLabel
};

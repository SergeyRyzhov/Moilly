var settings = require('../settings/index');

function readLabel(name, culture) {
	culture = correctCulture(culture);	
	return this[culture][name] || getDefault(name, culture);
}

function correctCulture(culture) {
	culture = culture || settings.common.defaultCulture;
	if(!this[culture]){		
		culture = settings.common.defaultCulture;
	}	
	return culture;
}

function getDefault(name, culture) {
	culture = culture || settings.common.defaultCulture;
	return 'No label named ' + name + ' of culture ' + culture;
}

module.exports = {
	ru: require('./ru.json'),
	en: require('./en.json'),

	get: readLabel,
	hasCulture: function(c) { return correctCulture (c) === c }
};

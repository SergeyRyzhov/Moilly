var _ = require('underscore');

function merge(target, source) {
	//console.log('t', target);	
	//console.log('s', source);
	
	_.defaults(target, source);
	for (var prop in target) {
		if (target.hasOwnProperty(prop) && typeof(source[prop]) ==='object') {
			merge(target[prop], source[prop]);
		}
	}	
	
	console.log('t', target);	
	return target;
}

module.exports = {
	merge: merge
};
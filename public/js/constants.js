define([
	'underscore'
], function (_) {

	return {
		keys: {
			culture: 'culture'
		},
		events: {
			navigation: {
				page: 'moilly.navigation.page',
				any: 'moilly.navigation.any'
			}
		},
		common: {
			//authpaths: ['account'], //todo. load from server
			bindingTimeout: 500
		}
	};
});
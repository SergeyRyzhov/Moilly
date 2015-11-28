define([
	'underscore'
], function (_) {

	return {
		keys: {
			culture: 'culture'
		},
		events: {
			navigation: {
				page: 'moilly.navigation.page'
			}
		},
		common: {
			authpaths: ['account'] //todo. load from server
		}
	}
});
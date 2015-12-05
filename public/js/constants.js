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
			},
			user: {
				required: 'moilly.user.required',
				changed: 'moilly.user.changed'
			}
		},
		common: {
			//authpaths: ['account'], //todo. load from server
			bindingTimeout: 500
		}
	};
});
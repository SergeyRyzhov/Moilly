define([
	'knockout',
	'underscore',
	'storage',
	'constants',
	'localization',
	'amplify',
	'moment',
	'responsejs',
	'json!/api/telegram/token'
], function (ko, _, storage, constants, localization, amplify, moment, responsejs, token) {


	return function () {
		return {
			token: token.token
		};
	};
});
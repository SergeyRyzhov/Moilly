define([
	'underscore',
	'knockout',
	'utils',
	'storage',
	'constants',
	'amplify',
	'responsejs'
], function (_, ko, utils, storage, constants, amplify, responsejs) {
	var page = ko.observable(utils.purl.attr('fragment'));

	var displayPage = ko.pureComputed(function () {
		return page() || 'refill';
	});

	function initialize() {
		amplify.subscribe(constants.events.navigation.page, page);


		responsejs.create({
            breakpoints: [0, 480, 481]
        });

		ko.applyBindings({
			page: displayPage
		});
	}

	function dispose() {
		amplify.unsubscribe(constants.events.navigation.page, page);
	}

	//initialize();
	setTimeout(initialize, 0);
});
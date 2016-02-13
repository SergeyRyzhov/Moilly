
var constants = require('../constants');
var labels = constants.labels;
var settings = constants.settings;

var formFactory = require('../tools/formFactory');

var _ = require('underscore');

var auth = require('../tools/authenticator');
var refill = require('../tools/refillService');

var culture = settings.common.defaultCulture;
if (labels.hasCulture(culture)) {
		labels = labels.load(culture);
}

function addFormMVT($, cb) {
	var form = formFactory.create(labels.add.form,
		(f) => {
			f.number('mileage');
			f.number('volume');
			f.number('total');
		});

	// console.log('mvt form', form);
	$.runForm(form, cb);
}

function addFormMTC($, cb) {
	var form = formFactory.create(labels.add.form,
		(f) => {
			f.number('mileage');
			f.number('total');
			f.number('cost');
		});

	// console.log('mtc form', form);
	$.runForm(form, cb);
}

function signinForm($, cb) {
	var form = formFactory.create(labels.auth.form,
		(f) => {
			f.string('name');
			f.number('token');
		});
	// console.log('signin form', form);
	$.runForm(form, cb);
}

function signupForm($, cb) {
	$.sendMessage(labels.auth.signup.title);
}

function buildMenu($) {
	var menu = {
		message: labels.menu.title
	};

	var startMenu = {
		message: labels.start.title
	};

	var addMenu = {
		message: labels.start.title
	};

	startMenu[labels.start.yes] = () => signinForm($, linkAccount.bind(_.noop, $));
	startMenu[labels.start.no] = () => signupForm($, console.log);

	addMenu[labels.add.mileageVolumeTotal] = () => addFormMVT($, addCallback.bind(_.noop, $));
	addMenu[labels.add.mileageTotalCost] = () => addFormMTC($, addCallback.bind(_.noop, $));

	menu[labels.menu.start] = startMenu;
	menu[labels.menu.add] = addMenu;

	return menu;
}



function end($) {
	$.sendMessage(labels.end);
	$.runMenu(buildMenu($));
}

function addCallback($, data) {
		console.log('Add refill', data);
		console.log('Context', $.user);
		if (auth.verify($.user)) {
			refill.add($.user, data);
		}
		else {
			$.sendMessage(labels.auth.error);
			$.runMenu(buildMenu($));
			return;
		}
		end($);
}

function linkAccount($, data) {
		console.log('Link account', data);
		console.log('Context', $.user);
		auth.signup($.user, data);
		
		end($);
}

module.exports = ($) => {
	$.runMenu(buildMenu($));
};

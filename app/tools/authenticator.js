var env = process.env;
var jwt = require('jsonwebtoken');

var constants = require('../constants/index');
var settings = require('./settings');
var expressJwt = require('express-jwt');
var logger = require('./logger')('Authentificator');

var secret = new Buffer(env.JWTSECRET, 'base64');
var anonymous = { isAuthenticated: false };

var jwtmidlware = expressJwt({
	secret: secret,
	getToken: function (req) {
		//console.log(req.cookies.authorization);
		
		if (req.cookies.authorization) {
			return req.cookies.authorization;
		}
		
		return jwt.sign(anonymous, secret);
	}
});

function sign(res, model) {
	var token = jwt.sign(model, secret);
	res.cookie('authorization', token);
	return token;
}


function logout(res) {
	var token = jwt.sign(anonymous, secret);
	res.cookie('authorization', token);
	return token;
}


module.exports = {
	midleware: jwtmidlware,
	sign: sign,
	logout: logout
};
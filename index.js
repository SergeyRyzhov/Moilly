var env = process.env;

var bot = require('./bot')(env);
var app = require('./site')(env);

var env = process.env;

var bot = require('./app/bot')(env);
var app = require('./app/site')(env);

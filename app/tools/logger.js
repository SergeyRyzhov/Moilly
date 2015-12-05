module.exports = function (name) {
	var log4js = require("log4js");
	log4js.configure({
		"appenders": [
			{
				type: 'console'
			},
			{
				"type": "file",
				"absolute": true,
				"filename": "logs/moilly.log",
				"maxLogSize": 20480,
				"backups": 10,
				"category": "absolute-logger"
			}]
	});
	return log4js.getLogger(name);
};

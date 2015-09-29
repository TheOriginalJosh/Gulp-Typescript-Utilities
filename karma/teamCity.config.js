// Karma configuration

var fullConfig = require('./full.config');

module.exports = function (karma) {
	var options = fullConfig(karma);
	options.reporters = ['teamcity'];

	karma.set(options);
	return options;
};

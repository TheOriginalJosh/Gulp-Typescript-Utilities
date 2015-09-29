// Karma configuration

var fullConfig = require('./full.config');

module.exports = function (karma, files) {
	var options = fullConfig(karma, files);
	options.reporters = ['teamcity'];

	karma.set(options);
	return options;
};

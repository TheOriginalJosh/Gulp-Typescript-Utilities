// Karma configuration

var fullConfig = require('./full.config');

module.exports = function (karma, files) {
	var options = fullConfig(karma, files);
	options.reporters = ['teamcity'];

	options.plugins = options.plugins || [];
	options.plugins.push('karma-teamcity-reporter');

	karma.set(options);
	return options;
};

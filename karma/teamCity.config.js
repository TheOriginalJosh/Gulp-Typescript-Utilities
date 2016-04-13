// Karma configuration

var fullConfig = require('./full.config');

module.exports = function (karma, testFiles, globalFiles, externals) {
	var options = fullConfig(karma, testFiles, globalFiles, externals);
	options.reporters = ['teamcity'];

	options.plugins = options.plugins || [];
	options.plugins.push('karma-teamcity-reporter');

	karma.set(options);
	return options;
};

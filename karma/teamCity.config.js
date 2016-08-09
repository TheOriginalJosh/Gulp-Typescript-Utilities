// Karma configuration

var teamCityReporter = require('karma-teamcity-reporter');
var sharedConfig = require('./shared.config');

module.exports =  function (karma, fileDependencies, settings) {
	var options = sharedConfig.config(karma, fileDependencies, settings);
	options.browsers = ['ChromeNoSandbox', 'Firefox'];
	options.reporters = ['teamcity'];

	options.plugins = options.plugins || [];
	options.plugins.push(teamCityReporter);

	karma.set(options);
	return options;
};

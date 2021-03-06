// Karma configuration

var sharedConfig = require('./shared.config');

module.exports =  function (karma, fileDependencies, settings) {
	var options = sharedConfig.config(karma, fileDependencies, settings);
	options.autoWatch = true;
	options.singleRun = false;

	karma.set(options);
	return options;
};

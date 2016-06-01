// Default karma configuration

var sharedConfig = require('./shared.config');

module.exports = function (karma, fileDependencies, settings) {
	var options = sharedConfig.config(karma, fileDependencies, settings);
	return options;
};

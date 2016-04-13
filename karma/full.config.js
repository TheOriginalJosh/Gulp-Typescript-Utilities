// Karma configuration

var defaultConfig = require('./default.config');

module.exports = function(karma, testFiles, globalFiles, externals) {
	var options = defaultConfig(karma, testFiles, globalFiles, externals);
	options.browsers = ['Chrome', 'Firefox', 'IE'];

	karma.set(options);
	return options;
};

// Karma configuration

var defaultConfig = require('./default.config');

module.exports = function(karma, files) {
	var options = defaultConfig(karma, files);
	options.browsers = ['Chrome', 'Firefox', 'IE'];

	karma.set(options);
	return options;
};

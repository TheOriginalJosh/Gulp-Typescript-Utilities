// Karma configuration

var defaultConfig = require('./default.config');

module.exports = function(karma) {
	var options = defaultConfig(karma);
	options.browsers = ['Chrome', 'Firefox', 'IE'];

	karma.set(options);
	return options;
};

// Karma configuration

var defaultConfig = require('./default.config');

module.exports =  function (karma, files) {
	var options = defaultConfig(karma, files);
	options.singleRun = false;

	// Add source-map-loader to webpack so that source maps will be retained
	if (options.webpack) {
		options.webpack.module = options.webpack.module || {};
		options.webpack.module.preLoaders = options.webpack.module.preLoaders || [];
		options.webpack.module.preLoaders.push({
			test: /\.js$/,
			loader: 'source-map-loader',
		});
	}

	karma.set(options);
	return options;
};

// Karma configuration

var defaultConfig = require('./default.config');

module.exports =  function (karma, testFiles, globalFiles, externals) {
	var options = defaultConfig(karma, testFiles, globalFiles, externals);
	options.autoWatch = true;
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

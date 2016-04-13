var loaders = require('./defaultLoaders');

module.exports = function () {
	return {
		bail: true,
		devtool: 'inline-source-map',
		module: {
			loaders: loaders,
		},
	};
};

module.exports = function () {
	return {
		bail: true,
		devtool: 'inline-source-map',
		module: {
			loaders: [
				{
					test: /\.json$/,
					loader: 'json-loader',
				},
			],
		},
	};
};

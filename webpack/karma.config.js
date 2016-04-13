module.exports = function () {
	return {
		bail: true,
		devtool: 'inline-source-map',
		module: {
			loaders: [
				{
					test: /\.css$/,
					loader: 'style-loader!css-loader',
				},
				{
					test: /\.html$/,
					exclude: /node_modules/,
					loader: 'raw-loader',
				},
				{
					test: /\.json$/,
					loader: 'json-loader',
				},
			],
		},
	};
};

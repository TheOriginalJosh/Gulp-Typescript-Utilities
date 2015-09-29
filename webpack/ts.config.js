module.exports = function() {
	return {
		module: {
			loaders: [
				{
					test: /\.ts$/,
					exclude: /node_modules/,
					loader: 'ts-loader',
				},
			],
		},
		resolve: {
			extensions: ['', '.webpack.js','.web.js', '.js', '.ts'],
		},
	};
};

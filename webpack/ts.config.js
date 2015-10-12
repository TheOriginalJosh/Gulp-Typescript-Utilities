module.exports = function() {
	return {
		bail: true,
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
			extensions: ['', '.webpack.js','.web.js', '.ts', '.js'],
		},
	};
};
